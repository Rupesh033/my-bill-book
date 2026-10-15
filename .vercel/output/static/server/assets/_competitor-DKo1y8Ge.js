import { n as notFound } from "./not-found-DtLyKJbw.js";
import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D0x3MnZt.js";
import { _ as buildSocialImageMeta, h as SITE, i as buildAlternativeFaqJsonLd, n as ALTERNATIVE_SLUGS, r as buildAlternativeBreadcrumbJsonLd, t as ALTERNATIVES, v as buildSoftwareJsonLd } from "./alternatives-content-DJKKrNlM.js";
//#region src/routes/alternatives/$competitor.tsx
var $$splitComponentImporter = () => import("./_competitor-DnLgBmVD.js");
function isAlternativeSlug(value) {
	return ALTERNATIVE_SLUGS.includes(value);
}
var Route = createFileRoute("/alternatives/$competitor")({
	loader: ({ params }) => {
		if (!isAlternativeSlug(params.competitor)) throw notFound();
		return ALTERNATIVES[params.competitor];
	},
	head: ({ loaderData: alternative }) => {
		if (!alternative) return {};
		const url = `${SITE.url}/alternatives/${alternative.slug}`;
		return {
			meta: [
				{ title: alternative.seoTitle },
				{
					name: "description",
					content: alternative.seoDescription
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:url",
					content: url
				},
				{
					property: "og:title",
					content: alternative.seoTitle
				},
				{
					property: "og:description",
					content: alternative.seoDescription
				},
				{
					property: "og:site_name",
					content: SITE.name
				},
				...buildSocialImageMeta(),
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: alternative.seoTitle
				},
				{
					name: "twitter:description",
					content: alternative.seoDescription
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(buildSoftwareJsonLd())
				},
				{
					type: "application/ld+json",
					children: JSON.stringify(buildAlternativeFaqJsonLd(alternative))
				},
				{
					type: "application/ld+json",
					children: JSON.stringify(buildAlternativeBreadcrumbJsonLd(alternative))
				}
			]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
