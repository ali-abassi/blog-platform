"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { PostForm } from "@/components/posts/post-form";
import { Id } from "../../../../../convex/_generated/dataModel";
import { notFound } from "next/navigation";
import { use } from "react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = useQuery(api.posts.getById, { id: id as Id<"posts"> });

  if (post === undefined) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8" />
        <div className="space-y-4">
          <div className="h-10 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (post === null) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
      <PostForm
        mode="edit"
        initialData={{
          id: post._id,
          title: post.title,
          content: post.content,
          status: post.status,
        }}
      />
    </div>
  );
}
