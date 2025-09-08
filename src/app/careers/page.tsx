
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CareersForm } from '@/components/careers-form';
import { MissionVision } from '@/components/mission-vision';
import { jobOpenings } from '@/lib/careers';

export default function CareersPage() {
  return (
    <div className="bg-primary/5 min-h-[calc(100vh-4rem)] py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary dark:text-primary-foreground">
                Join Our Journey
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
                Learn more about our mission, vision, and how you can be a part of our team.
            </p>
        </div>
        
        <div className="mb-12">
          <MissionVision />
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center text-primary dark:text-primary-foreground mt-8 mb-8">
            Current Openings
          </h2>
          <div className="mx-auto max-w-3xl space-y-8">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl text-primary dark:text-primary-foreground">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 dark:text-foreground/80">
                      <span>{job.location}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                      <span>{job.type}</span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 dark:text-foreground/80">{job.description}</p>
                  <div className="flex justify-end">
                    <CareersForm />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
