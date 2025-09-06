
import { FindTutorForm } from '@/components/find-tutor-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FindTutorPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-primary/5 p-4 py-12 overflow-hidden">
      <div 
        className="absolute inset-0 bg-repeat" 
        style={{ 
          backgroundImage: "url('/subtle-pattern.svg')",
          opacity: 0.05,
        }}
      />
      <Card className="w-full max-w-2xl shadow-2xl z-10 bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Find Your Perfect Tutor</CardTitle>
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
