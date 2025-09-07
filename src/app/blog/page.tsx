
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Mastering the Art of Business Communication',
    description: 'Learn how to write effective emails, deliver compelling presentations, and navigate the modern workplace with confidence.',
    image: '/images/business-communication.jpeg',
    slug: 'mastering-business-communication',
    aiHint: 'business meeting presentation',
    date: 'October 26, 2023',
    readTime: '5 min read',
  },
  {
    title: 'Unlocking Your Potential with the IELTS Accelerator',
    description: 'Discover the key strategies and techniques to help you achieve your target score in the IELTS exam.',
    image: '/images/ielts-accelerator.jpeg',
    slug: 'ielts-accelerator-strategies',
    aiHint: 'student studying exam',
    date: 'October 22, 2023',
    readTime: '7 min read',
  },
  {
    title: 'Why Phonics is the Foundation of Early Learning',
    description: 'Explore the importance of phonics in helping young children develop strong reading and spelling skills.',
    image: '/images/phonics-starter.jpeg',
    slug: 'why-phonics-matters',
    aiHint: 'child learning alphabet',
    date: 'October 18, 2023',
    readTime: '4 min read',
  },
   {
    title: 'From Shy Speaker to Confident Communicator',
    description: "Learn practical tips and exercises to overcome the fear of public speaking and deliver your message with impact.",
    image: '/images/public-speaking.jpeg',
    slug: 'public-speaking-confidence',
    aiHint: 'person speaking confidently',
    date: 'October 15, 2023',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-primary/5 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
            Verbigo Blog
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Insights, tips, and stories on language learning and communication.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 flex flex-col bg-background/80 backdrop-blur-sm border-primary/10">
               <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
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
                    <CardTitle className="text-xl text-primary group-hover:text-accent">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.date} &middot; {post.readTime}</span>
                     <div className="flex items-center text-primary font-medium">
                        Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </CardFooter>
               </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
