'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { appendContactToGoogleSheet } from '@/app/actions/appendContactToGoogleSheet';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phoneNumber || !form.message) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    const result = await appendContactToGoogleSheet(form);

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Success!',
        description: 'Your message has been sent. We will get back to you soon.',
      });
      setForm({ name: '', email: '', phoneNumber: '', message: '' });
    } else {
      toast({
        title: 'Error',
        description: `Failed to send message: ${result.error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
