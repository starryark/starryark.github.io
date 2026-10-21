import { publishedPosts, postUrl } from '../lib/content';
import { site } from '../site';
import { profile, work, experience, posters } from '../profile';

// A plain-text mirror of what the pages say. Nothing here is absent from the visible site.
export async function GET() {
  const posts = await publishedPosts();
  const { education } = profile;
  const sections = [
    `# ${site.name}`,
    `> ${site.description}`,
    `## Facts

- Name: ${site.name}; preferred name ${profile.preferredName}; handle "${profile.handle}" on GitHub.
- Role: founder of ${profile.company.name} (${profile.company.legalName}, incorporated 2026), which builds ${profile.company.description}: ${profile.company.url}
- Education: ${education.degree}, ${education.school}, conferred ${education.conferred}. GPA ${education.gpa}. Honors: ${education.honors.map(({ name, detail }) => (detail ? `${name}, ${detail}` : name)).join('; ')}. Verifiable at ${education.diploma.verifyUrl} with CeDiD ${education.diploma.id}.
- Location: ${profile.location}.
- Open to: ${profile.openTo}.
- Contact: ${site.email}
- Profiles: ${site.links
      .filter((link) => link.primary)
      .map((link) => `${link.label} ${link.href}`)
      .join('; ')}
- Last updated: ${profile.updated}`,
    `## Work

${work
  .map(
    (item) =>
      `### ${item.title}\n\n${item.context}. ${item.dates}. Status: ${item.status.label}.\n\n${item.summary}\n\nRole: ${item.role}${item.limits ? `\n\nLimits: ${item.limits}` : ''}${item.evidence.length ? `\n\nEvidence:\n${item.evidence.map((e) => `- [${e.label}](${e.href})`).join('\n')}` : ''}`,
  )
  .join('\n\n')}`,
    `## Experience

${experience.map((entry) => `- ${entry.dates}: ${entry.title}, ${entry.org}. ${entry.text}${entry.evidence ? ` Evidence: ${entry.evidence.href}` : ''}`).join('\n')}`,
    `## Posters

${posters.map((p) => `- ${p.authors}. "${p.title}." ${p.venue}, ${p.year}.`).join('\n')}`,
    `## Pages

- [Home](${site.url}/): Current work and background.
- [Work](${site.url}/work/): Every project with dates, role, limits, and evidence.
- [CV](${site.url}/cv/): Education, experience, posters, skills, and coursework.
- [Writing](${site.url}/writing/): Published articles.
- [About](${site.url}/about/): Background and interests, in Yangyi's own words.`,
    `## Articles

${posts.map((post) => `- [${post.data.title}](${site.url}${postUrl(post)}): ${post.data.description}`).join('\n')}`,
  ];
  return new Response(`${sections.join('\n\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
