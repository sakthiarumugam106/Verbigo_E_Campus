
'use client';

import { useState } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/lib/blog';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/loading-provider';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();

  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showLoader();
    router.push(href);
    setTimeout(hideLoader, 1000);
  };


  return (
    <div className="bg-primary/5 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-primary dark:text-primary-foreground sm:text-5xl md:text-6xl">
            Verbigo Blog
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
            Insights, tips, and stories on language learning and communication.
          </p>
        </div>

        <div className="mx-auto max-w-2xl mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search for articles..."
                    className="w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {filteredBlogPosts.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredBlogPosts.map((post, index) => (
              <Card key={index} className="group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 flex flex-col bg-background/80 backdrop-blur-sm border-primary/10">
                 <Link href={`/blog/${post.slug}`} onClick={handleLinkClick(`/blog/${post.slug}`)} className="flex flex-col h-full">
                  <div className="overflow-hidden">
                      <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={post.aiHint}
                      />
                  </div>
                  <CardHeader>
                      <CardTitle className="text-xl text-primary group-hover:text-primary-foreground dark:text-primary-foreground">{post.title}</CardTitle>
                      <CardDescription className="dark:text-foreground/80">{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto flex items-center justify-between text-sm text-muted-foreground dark:text-foreground/80">
                      <span>{post.date} &middot; {post.readTime}</span>
                       <div className="flex items-center text-primary dark:text-primary-foreground font-medium">
                          Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                  </CardFooter>
                 </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center max-w-5xl mx-auto py-16">
            <p className="text-lg text-muted-foreground dark:text-foreground/80">No articles found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
