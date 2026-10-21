import { site } from '../site';
import { profile } from '../profile';

// schema.org ProfilePage for the person this site describes. It repeats facts
// that are visible on the page; it never adds claims of its own.
export function profilePage(path: string) {
  const url = new URL(path, site.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    dateModified: profile.updated,
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: profile.name,
      alternateName: [`${profile.preferredName} Liu`, profile.handle],
      url: `${site.url}/`,
      email: `mailto:${site.email}`,
      jobTitle: 'Founder',
      description: site.description,
      image: `${site.url}/assets/img/portrait-640.webp`,
      worksFor: {
        '@type': 'Organization',
        name: profile.company.name,
        legalName: profile.company.legalName,
        url: profile.company.url,
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: profile.education.school,
        url: 'https://ucsd.edu',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: profile.education.degree,
        recognizedBy: { '@type': 'CollegeOrUniversity', name: profile.education.school },
      },
      homeLocation: { '@type': 'Place', name: profile.location },
      knowsLanguage: ['en', 'zh', 'ja'],
      knowsAbout: [
        'Agentic AI for biological research',
        'Molecular animation',
        'Molecular and cell biology',
        'C. elegans genetics',
        'Yeast synthetic biology',
      ],
      sameAs: site.links.filter((link) => link.primary).map((link) => link.href),
    },
  };
}
