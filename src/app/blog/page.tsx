"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PostCard } from "@/components/posts/post-card";
import { EmptyState } from "@/components/posts/empty-state";

export default function BlogPage() {
  const posts = useQuery(api.posts.listPublished);

  if (posts === undefined) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {posts.length === 0 ? (
        <EmptyState message="No posts yet. Check back soon!" />
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              publishedAt={post.publishedAt!}
            />
          ))}
        </div>
      )}
    </div>
  );
}
