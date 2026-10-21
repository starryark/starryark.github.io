import { getCollection } from 'astro:content';
import { publishedPosts, postUrl, plainText } from '../lib/content';
import { work } from '../profile';
export async function GET() {
  const entries = [
    ...(await publishedPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      body: plainText(post.body),
      url: postUrl(post),
      kind: post.data.kind,
    })),
    ...(await getCollection('pages')).map((page) => ({
      title: page.data.title,
      description: page.data.description,
      body: plainText(page.body),
      url: `/${page.id}/`,
      kind: 'Page',
    })),
    ...work.map((item) => ({
      title: item.title,
      description: item.summary,
      body: [item.context, ...item.details, item.role, item.limits ?? ''].join(' '),
      url: `/work/#${item.id}`,
      kind: 'Work',
    })),
  ];
  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
