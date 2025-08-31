
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { courses } from '@/app/page';
import { ArrowRight } from 'lucide-react';

function CourseCard({ course }: { course: typeof courses[0] }) {
  return (
    <Card className="group h-full overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 flex flex-col">
      <Link href={`/courses/${course.slug}`} className="flex flex-col h-full">
        <div className="overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            width={600}
            height={400}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={course.aiHint}
          />
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <CardTitle className="text-xl font-bold text-primary group-hover:text-accent">{course.title}</CardTitle>
          <p className="mt-2 text-muted-foreground text-sm flex-grow">{course.description}</p>
          <div className="flex items-center mt-4 text-primary font-medium">
            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default function AllCoursesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const filteredCourses = courses.filter(
    (course) => course.language === selectedLanguage
  );

  return (
    <div className="bg-primary/5 min-h-[calc(100vh-4rem)]">
      <section className="container px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
            Explore All Our Courses
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Find the perfect course to achieve your language learning goals. Select a language to get started.
          </p>
        </div>

        <Tabs defaultValue="English" className="w-full max-w-md mx-auto mt-12" onValueChange={setSelectedLanguage}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="English">English</TabsTrigger>
            <TabsTrigger value="Tamil">Tamil</TabsTrigger>
          </TabsList>
          <TabsContent value="English">
             <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="Tamil">
             <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

    