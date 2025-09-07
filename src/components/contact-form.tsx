
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { appendContactToGoogleSheet } from '@/app/actions/appendContactToGoogleSheet';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const countryCodes = [
    { value: '+91', label: 'IN (+91)' },
    { value: '+1', label: 'US (+1)' },
    { value: '+44', label: 'UK (+44)' },
    { value: '+61', label: 'AU (+61)' },
    { value: '+_other', label: 'Other' },
]

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', message: '' });
  const [countryCode, setCountryCode] = useState('+91');
  const [customCountryCode, setCustomCountryCode] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
        setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    const finalCountryCode = countryCode === '+_other' ? customCountryCode : countryCode;
    const fullPhoneNumber = `${finalCountryCode} ${form.phoneNumber}`;

    const result = await appendContactToGoogleSheet({
        ...form,
        phoneNumber: fullPhoneNumber
    });

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Success!',
        description: 'Your message has been sent. We will get back to you soon.',
      });
      setForm({ name: '', email: '', phoneNumber: '', message: '' });
      setCountryCode('+91');
      setCustomCountryCode('');
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
        <Input id="name" name="name" placeholder="Your Name" value={form.name} onChange={handleInputChange} required />
        {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
      </div>
      <div className="grid gap-2 text-left">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleInputChange} required />
        {errors.email && <p className="text-destructive text-xs">{errors.email[0]}</p>}
      </div>
      <div className="grid gap-2 text-left">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <div className="flex gap-2">
            <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                    {countryCodes.map(c => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {countryCode === '+_other' && (
                 <Input 
                    id="customCountryCode" 
                    name="customCountryCode" 
                    placeholder="+CC" 
                    value={customCountryCode} 
                    onChange={(e) => setCustomCountryCode(e.target.value)} 
                    className="w-[80px]"
                    required 
                />
            )}
            <Input id="phoneNumber" type="tel" name="phoneNumber" placeholder="9876543210" value={form.phoneNumber} onChange={handleInputChange} required />
        </div>
        {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber[0]}</p>}
      </div>
      <div className="grid gap-2 text-left">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your Message" value={form.message} onChange={handleInputChange} required />
        {errors.message && <p className="text-destructive text-xs">{errors.message[0]}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
