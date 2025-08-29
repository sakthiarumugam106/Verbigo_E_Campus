'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitDemoRequest, type DemoFormState } from '@/app/get-demo/actions';

const initialState: DemoFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={pending}>
      {pending ? 'Submitting...' : 'Request Demo'}
    </Button>
  );
}

export function GetDemoForm() {
  const [state, formAction] = useFormState(submitDemoRequest, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
        {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
        {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="(123) 456-7890" required />
        {state.errors?.phoneNumber && <p className="text-sm text-destructive mt-1">{state.errors.phoneNumber[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
