
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitApplication, type ApplicationFormState } from '@/app/careers/actions';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const initialState: ApplicationFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Application'}
    </Button>
  );
}

export function CareersForm() {
  const [state, formAction] = useActionState(submitApplication, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
   const [educationValue, setEducationValue] = useState('');

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
        setEducationValue('');
        setIsOpen(false);
      }
    }
  }, [state, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-primary'>Apply for Language Tutor</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Jane Austen" required />
                {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="jane.austen@example.com" required />
                {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" placeholder="30" required />
                {state.errors?.age && <p className="text-sm text-destructive mt-1">{state.errors.age[0]}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="language">Language you specialize in</Label>
                <Input id="language" name="language" placeholder="e.g., Spanish, French" required />
                {state.errors?.language && <p className="text-sm text-destructive mt-1">{state.errors.language[0]}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="education">Highest Education Level</Label>
                 <input type="hidden" name="education" value={educationValue} />
                <Select name="education-select" required onValueChange={setEducationValue}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="High School">High School / GED</SelectItem>
                        <SelectItem value="Associate Degree">Associate Degree</SelectItem>
                        <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                        <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                        <SelectItem value="Doctorate">Doctorate (PhD)</SelectItem>
                         <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {state.errors?.education && <p className="text-sm text-destructive mt-1">{state.errors.education[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="resume">Resume (URL)</Label>
                <Input id="resume" name="resume" placeholder="https://linkedin.com/in/..." required />
                {state.errors?.resume && <p className="text-sm text-destructive mt-1">{state.errors.resume[0]}</p>}
            </div>
            <SubmitButton />
            </form>
      </DialogContent>
    </Dialog>
  );
}
