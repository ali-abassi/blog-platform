import { PostForm } from "@/components/posts/post-form";

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">New Post</h1>
      <PostForm mode="create" />
    </div>
  );
}
