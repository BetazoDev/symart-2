import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/data";

export const metadata: Metadata = { title: "Blog" };

export default function Page() {
  return (
    <div className="">
      <div className="bg-surface px-4 py-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl">Blog</h1>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <img src={post.image} alt="" className="aspect-[16/10] w-full object-cover" />
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-brand">{post.category} · {post.date}</p>
              <h2 className="mt-2 text-2xl">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
