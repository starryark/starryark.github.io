import { publishedPosts, bibtex, type Post } from '../../lib/content';
export async function getStaticPaths() {
  return (await publishedPosts()).map((post) => ({ params: { id: post.id }, props: { post } }));
}
export function GET({ props }: { props: { post: Post } }) {
  return new Response(bibtex(props.post), {
    headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' },
  });
}
