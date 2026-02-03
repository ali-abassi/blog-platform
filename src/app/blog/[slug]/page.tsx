"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { MarkdownRenderer } from "@/components/posts/markdown-renderer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = useQuery(api.posts.getBySlug, { slug });

  if (post === undefined) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8" />
        <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-4" />
        <div className="h-6 w-48 bg-muted animate-pulse rounded mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (post === null) {
    notFound();
  }

  const date = new Date(post.publishedAt!).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/blog"
        className="text-primary hover:underline mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-muted-foreground mb-8">Published on {date}</p>
        <hr className="mb-8" />
        <MarkdownRenderer content={post.content} />
      </article>
    </div>
  );
}
