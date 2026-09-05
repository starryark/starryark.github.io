import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../site';

export type Post = CollectionEntry<'writing'>;
export const postUrl = (post: Post) => `/posts/${post.id}/`;
export const dateLabel = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
export const shortDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
export const readingTime = (body = '') => Math.max(1, Math.ceil(body.split(/\s+/).length / 220));
export const plainText = (body = '') =>
  body
    .replace(/import .*?from .*?;?\r?\n/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*`_\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export async function publishedPosts() {
  return (
    await getCollection('writing', ({ data }) => !data.draft && data.date <= new Date())
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const bibEscape = (s: string) => s.replace(/\\/g, '\\textbackslash{}').replace(/[{}%&#_]/g, '\\$&');
export function bibtex(post: Post) {
  const d = post.data;
  const fields = {
    title: d.title,
    author: d.authors.map((a) => a.name).join(' and '),
    year: String(d.date.getUTCFullYear()),
    ...(d.venue ? { journal: d.venue } : {}),
    ...(d.doi ? { doi: d.doi } : {}),
    url: new URL(postUrl(post), site.url).href,
  };
  return `@${d.kind === 'Research' ? 'article' : 'misc'}{${post.id.replace(/[^a-zA-Z0-9-]/g, '')},\n${Object.entries(
    fields,
  )
    .map(([k, v]) => `  ${k} = {${bibEscape(v)}}`)
    .join(',\n')}\n}\n`;
}
