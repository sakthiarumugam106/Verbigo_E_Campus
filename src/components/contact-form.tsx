'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const initialState: ContactFormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          variant: 'destructive',
          title: 'Oops!',
          description: state.message,
        });
      } else {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Input name="name" placeholder="Name" required />
        {state.errors?.name && <p className="text-xs text-destructive">{state.errors.name[0]}</p>}
      </div>
      <div className="grid gap-2">
        <Input type="email" name="email" placeholder="Email" required />
        {state.errors?.email && <p className="text-xs text-destructive">{state.errors.email[0]}</p>}
      </div>
       <div className="grid gap-2">
        <Input type="tel" name="phoneNumber" placeholder="Phone Number" required />
        {state.errors?.phoneNumber && <p className="text-xs text-destructive">{state.errors.phoneNumber[0]}</p>}
      </div>
      <div className="grid gap-2">
        <Textarea name="message" placeholder="Your Message" required />
        {state.errors?.message && <p className="text-xs text-destructive">{state.errors.message[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
