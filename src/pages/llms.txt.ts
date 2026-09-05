import { publishedPosts, postUrl } from '../lib/content';
import { site } from '../site';
export async function GET() {
  const posts = await publishedPosts();
  const text = `# ${site.name}\n\n> ${site.description}\n\n## About\n\n${site.name} is a UC San Diego Molecular and Cell Biology graduate (Class of '26, Cum Laude). He is developing agentic systems for bioinformatic analysis at AmadeusBio.ai (2026–present). He lives near UC San Diego and is interested in AI, illustrative art, visual novels, and crows. His biography and personal views are at ${site.url}/about/.\n\n## Pages\n\n- [Home](${site.url}/): Current work and recent writing.\n- [About](${site.url}/about/): Background, interests, and contact links.\n- [Writing](${site.url}/writing/): All published articles.\n\n## Articles\n\n${posts.map((post) => `- [${post.data.title}](${site.url}${postUrl(post)}): ${post.data.description}`).join('\n')}\n\n## Contact\n\n${site.email}\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
