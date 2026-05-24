import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

type Props = { post: CollectionEntry<'blog'> };

const yamlEscape = (s: string) => s.replace(/"/g, '\\"');

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as Props;
  const { title, description, pubDate, updatedDate, tags } = post.data;

  const lines: string[] = ['---'];
  lines.push(`title: "${yamlEscape(title)}"`);
  lines.push(`description: "${yamlEscape(description)}"`);
  lines.push(`pubDate: ${pubDate.toISOString()}`);
  if (updatedDate) lines.push(`updatedDate: ${updatedDate.toISOString()}`);
  if (tags.length > 0) {
    lines.push('tags:');
    for (const t of tags) lines.push(`  - "${yamlEscape(t)}"`);
  }
  lines.push('---', '');
  lines.push(post.body ?? '');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
