import * as fs from 'node:fs'
import * as path from 'node:path'

const rootDir = process.cwd()
const distClient = path.join(rootDir, 'dist', 'client')
const distServer = path.join(rootDir, 'dist', 'server')
const vercelDir = path.join(rootDir, '.vercel')
const outputDir = path.join(vercelDir, 'output')
const staticDir = path.join(outputDir, 'static')
const functionsDir = path.join(outputDir, 'functions')
const handlerFuncDir = path.join(functionsDir, '_handler.func')

function copyDirRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

console.log('⚡ Preparing Vercel Build Output API v3 (Node.js Serverless)...')

// Clean previous output
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true })
}

fs.mkdirSync(staticDir, { recursive: true })
fs.mkdirSync(handlerFuncDir, { recursive: true })

// 1. Copy client assets to static/
console.log('📦 Copying static client assets...')
copyDirRecursive(distClient, staticDir)

// 2. Copy server build to _handler.func/server
console.log('⚙️ Setting up Node.js serverless function...')
const serverDest = path.join(handlerFuncDir, 'server')
copyDirRecursive(distServer, serverDest)

// 3. Write package.json inside _handler.func
fs.writeFileSync(
  path.join(handlerFuncDir, 'package.json'),
  JSON.stringify({ type: 'module' }, null, 2),
  'utf-8',
)

// 4. Write .vc-config.json for Node.js 22.x runtime
fs.writeFileSync(
  path.join(handlerFuncDir, '.vc-config.json'),
  JSON.stringify(
    {
      runtime: 'nodejs22.x',
      launcherType: 'Nodejs',
      handler: 'index.js',
      maxDuration: 60,
      memory: 1024,
      supportsCancellation: true,
    },
    null,
    2,
  ),
  'utf-8',
)

// 5. Write Node.js HTTP bridge handler
const nodeEntryCode = `import worker from './server/index.js';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, \`\${protocol}://\${host}\`);

    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (val !== undefined) {
        if (Array.isArray(val)) {
          for (const item of val) headers.append(key, item);
        } else {
          headers.set(key, val);
        }
      }
    }

    const method = req.method?.toUpperCase() || 'GET';
    const hasBody = !['GET', 'HEAD'].includes(method);
    let body;
    if (hasBody) {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }
    const request = new Request(url.href, {
      method,
      headers,
      body,
    });

    const response = await worker.fetch(request, process.env);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error('SSR Handler Error:', err);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: err?.message || String(err) }));
  }
}
`
fs.writeFileSync(path.join(handlerFuncDir, 'index.js'), nodeEntryCode, 'utf-8')

// 6. Write config.json with static fallback and function routing
const vercelConfig = {
  version: 3,
  routes: [
    {
      handle: 'filesystem',
    },
    {
      src: '/(.*)',
      dest: '/_handler',
    },
  ],
}

fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify(vercelConfig, null, 2),
  'utf-8',
)

// 7. Write builds.json
fs.writeFileSync(
  path.join(outputDir, 'builds.json'),
  JSON.stringify(
    {
      target: 'production',
    },
    null,
    2,
  ),
  'utf-8',
)

console.log('✅ Vercel Node.js Serverless Output is ready in .vercel/output')
