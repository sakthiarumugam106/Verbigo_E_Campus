
import { blogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <article className="prose prose-lg mx-auto max-w-4xl bg-background p-6 md:p-10 rounded-xl shadow-lg">
          <div className="mb-8">
            <Link href="/blog" className="text-primary hover:underline">&larr; Back to Blog</Link>
          </div>
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
             <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.aiHint}
            />
          </div>
          <header className="mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary !mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                </div>
            </div>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
}
