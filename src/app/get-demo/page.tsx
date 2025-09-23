
import { GetDemoForm } from '@/components/get-demo-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function GetDemoPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary dark:text-primary-foreground">Request a Consultation</CardTitle>
          <CardDescription>
            Interested in a course? Fill out the form below, and one of our language experts will contact you to discuss your learning goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GetDemoForm />
        </CardContent>
      </Card>
    </div>
  );
}
