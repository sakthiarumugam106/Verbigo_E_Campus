'use client';

import { FindTutorForm } from '@/components/find-tutor-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FindTutorPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4 py-12">
      <Card className="neumorphic-outer w-full max-w-2xl z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary dark:text-primary-foreground">Find Your Perfect Tutor</CardTitle>
          <CardDescription>
            Fill out the form below, and we'll connect you with a language expert who fits your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FindTutorForm />
        </CardContent>
      </Card>
    </div>
  );
}
