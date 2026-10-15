import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

config({ path: ['.env.local', '.env'] })

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const sql = neon(url)
const drizzleDir = path.resolve(process.cwd(), 'drizzle')
const files = fs.readdirSync(drizzleDir).filter(f => f.endsWith('.sql')).sort()

console.log(`Found ${files.length} migration files to apply...`)

function parseStatements(content: string): string[] {
  // If it has statement breakpoints, split by that
  if (content.includes('--> statement-breakpoint')) {
    return content.split('--> statement-breakpoint').map(s => s.trim()).filter(Boolean)
  }
  // Otherwise split by semicolon
  return content
    .split(/;\s*$/m)
    .flatMap(chunk => chunk.split(';'))
    .map(s => s.trim())
    .filter(Boolean)
}

for (const file of files) {
  const filePath = path.join(drizzleDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  const statements = parseStatements(content)

  console.log(`Applying ${file} (${statements.length} statements)...`)
  for (let statement of statements) {
    statement = statement.trim()
    if (!statement) continue
    try {
      await sql.query(statement)
    } catch (err: any) {
      if (
        err.message?.includes('already exists') ||
        err.message?.includes('duplicate key')
      ) {
        console.warn(`  [Warning] ${err.message}`)
      } else {
        console.error(`  [Error in ${file}]`, statement.slice(0, 80))
        throw err
      }
    }
  }
  console.log(`✓ ${file} applied successfully.`)
}

console.log('All migrations applied successfully via Neon HTTP!')
