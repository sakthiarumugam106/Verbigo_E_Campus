
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
      <section className="container py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                Join Our Journey
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Learn more about our mission, vision, and how you can be a part of our team.
            </p>
        </div>
        <MissionVision />
        <div className="mt-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center text-primary mt-8 mb-8">
            Current Openings
          </h2>
          {jobOpenings.map((job, index) => (
            <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-6xl mx-auto">
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
