import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: posts.find((post) => post.slug === slug)?.title ?? "Nota" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  return (
    <article className="">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <Link href="/blog" className="text-sm text-muted hover:text-ink">Blog</Link>
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-brand">{post.category} · {post.date}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{post.title}</h1>
        <img src={post.image} alt="" className="mt-8 aspect-[16/9] w-full object-cover" />
        <div className="mt-8 space-y-4 text-base leading-8 text-muted">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
