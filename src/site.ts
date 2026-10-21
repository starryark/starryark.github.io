export const site = {
  name: 'Yangyi Liu',
  title: 'Yangyi Liu',
  description:
    'Yangyi Liu (starryark) founded AmadeusBio.ai, which builds AI agents that accelerate biological research. Molecular and cell biology graduate of UC San Diego, based in San Diego.',
  url: 'https://liuyangyi.com',
  email: 'lyangyilliu@gmail.com',
  location: 'San Diego, California',
  tagline: 'Founder of AmadeusBio.ai, which builds AI agents that accelerate biological research.',
  // Primary links appear on the homepage and CV; the rest only on the About page.
  links: [
    { label: 'GitHub', href: 'https://github.com/starryark', primary: true },
    { label: 'Hugging Face', href: 'https://huggingface.co/starrydark', primary: false },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yangyi-liu-a78211281', primary: true },
    { label: 'Pixiv', href: 'https://www.pixiv.net/users/41472729', primary: true },
    { label: 'Discord', href: 'https://discord.com/users/502659444493123596', primary: false },
    { label: 'Steam', href: 'https://steamcommunity.com/id/starrydark', primary: false },
  ] as const,
};
