
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { appendContactToGoogleSheet } from '@/app/actions/appendContactToGoogleSheet';
import { Label } from './ui/label';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', message: '' });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = await appendContactToGoogleSheet(form);

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Success!',
        description: 'Your message has been sent. We will get back to you soon.',
      });
      setForm({ name: '', email: '', phoneNumber: '', message: '' });
      setErrors({});
    } else {
       if (result.error && typeof result.error === 'object') {
        setErrors(result.error);
        toast({
          title: 'Error',
          description: 'Please correct the errors in the form.',
          variant: 'destructive',
        });
      } else {
        toast({
            title: 'Error',
            description: `Failed to send message: ${result.error || 'An unknown error occurred.'}`,
            variant: 'destructive',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2 text-left">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
      </div>
      <div className="grid gap-2 text-left">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
        {errors.email && <p className="text-destructive text-xs">{errors.email[0]}</p>}
      </div>
      <div className="grid gap-2 text-left">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" type="tel" name="phoneNumber" placeholder="e.g., +91 98765 43210" value={form.phoneNumber} onChange={handleChange} required />
        {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber[0]}</p>}
      </div>
      <div className="grid gap-2 text-left">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
        {errors.message && <p className="text-destructive text-xs">{errors.message[0]}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
