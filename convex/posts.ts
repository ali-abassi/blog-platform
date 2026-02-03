import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

// Query: Get all posts (admin view)
export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .order("desc")
      .collect();
  },
});

// Query: Get published posts only (public view)
export const listPublished = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
  },
});

// Query: Get single post by slug (public view)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!post || post.status !== "published") {
      return null;
    }
    return post;
  },
});

// Query: Get single post by ID (admin view)
export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation: Create new post
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const slug = generateSlug(args.title);
    const excerpt = args.content.slice(0, 150).trim() + "...";

    return await ctx.db.insert("posts", {
      title: args.title,
      slug,
      content: args.content,
      excerpt,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Mutation: Update existing post
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Post not found");

    const now = Date.now();
    const patch: Record<string, unknown> = { ...updates, updatedAt: now };

    if (updates.content) {
      patch.excerpt = updates.content.slice(0, 150).trim() + "...";
    }

    if (updates.title && existing.status === "draft") {
      patch.slug = generateSlug(updates.title);
    }

    if (updates.status === "published" && existing.status !== "published") {
      patch.publishedAt = now;
    }

    if (updates.status === "draft" && existing.status === "published") {
      patch.publishedAt = undefined;
    }

    await ctx.db.patch(id, patch);
    return id;
  },
});

// Mutation: Delete post
export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
