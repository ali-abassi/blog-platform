import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: number;
}

export function PostCard({ title, slug, excerpt, publishedAt }: PostCardProps) {
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {title}
            </Link>
          </CardTitle>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-primary hover:underline text-sm mt-2 inline-block"
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  );
}
