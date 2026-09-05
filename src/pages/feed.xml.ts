import rss from '@astrojs/rss';
import { publishedPosts, postUrl } from '../lib/content';
import { site } from '../site';
export async function GET() {
  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    site: site.url,
    items: (await publishedPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
