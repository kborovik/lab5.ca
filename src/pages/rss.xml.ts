import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: 'lab5.ca blog',
    description:
      'Notes on cloud infrastructure, AI agents for business workflows, and web development.',
    site: context.site ?? 'https://lab5.ca',
    items: posts.map(p => ({
      title: p.data.title,
      link: `/blog/${p.id}/`,
      pubDate: p.data.pubDate,
      description: p.data.description,
      categories: p.data.tags,
    })),
  });
}
