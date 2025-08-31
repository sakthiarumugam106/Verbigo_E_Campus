import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { CareersForm } from '@/components/careers-form';
import { MissionVision } from '@/components/mission-vision';

const jobOpenings = [
  {
    title: 'Language Tutor',
    description: 'We are looking for passionate and experienced language tutors to join our team. You will be responsible for creating engaging lesson plans and providing personalized instruction to our students.',
    location: 'Remote',
    type: 'Part-time',
  },
];

export default function CareersPage() {
  return (
    <div className="bg-primary/5 min-h-[calc(100vh-4rem)]">
      <section className="container px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
            Join Our Team
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            We're on a mission to make language learning accessible to everyone. If you're passionate about education and technology, we'd love to hear from you.
          </p>
        </div>
        <MissionVision />
        <div className="mt-12 grid gap-8">
          {jobOpenings.map((job, index) => (
            <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-2xl text-primary">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span>{job.location}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                    <span>{job.type}</span>
                  </CardDescription>
                </div>
                 <CareersForm />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
