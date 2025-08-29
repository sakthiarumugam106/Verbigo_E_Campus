import { GetDemoForm } from '@/components/get-demo-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GetDemoPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-primary/5 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Request a Demo</CardTitle>
          <CardDescription>
            See Verbigo E-Campus in action. Fill out the form below, and our team will be in touch to schedule a personalized demo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GetDemoForm />
        </CardContent>
      </Card>
    </div>
  );
}
