
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { appendContactToGoogleSheet } from '@/app/actions/appendContactToGoogleSheet';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const countryCodes = {
  '91': { label: 'IN', length: 10 },
  '1': { label: 'US', length: 10 },
  '44': { label: 'UK', length: 10 },
  '61': { label: 'AU', length: 9 },
};

type CountryCode = keyof typeof countryCodes;

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', message: '' });
  const [countryCode, setCountryCode] = useState<CountryCode | 'Other'>('91');
  const [otherCountryCode, setOtherCountryCode] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const currentMaxLength = countryCode !== 'Other' ? countryCodes[countryCode as CountryCode]?.length : undefined;
    // Only allow numbers and limit length
    if (/^\d*$/.test(value) && (!currentMaxLength || value.length <= currentMaxLength)) {
      setForm({ ...form, phoneNumber: value });
    }
  };

  const handleCountryCodeChange = (value: string) => {
    setForm({ ...form, phoneNumber: '' }); // Reset phone number on country change
    if (value === 'Other') {
      setCountryCode(value as 'Other');
      setOtherCountryCode('');
    } else {
      setCountryCode(value as CountryCode);
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phoneNumber: '', message: '' });
    setCountryCode('91');
    setOtherCountryCode('');
    setErrors({});
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    resetForm();
    router.push('/');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    const finalCountryCode = countryCode === 'Other' ? otherCountryCode : countryCode;
    const sheetPhoneNumber = `${finalCountryCode} ${form.phoneNumber}`;
    const emailPhoneNumber = `+${finalCountryCode} ${form.phoneNumber}`;

    const result = await appendContactToGoogleSheet({
      ...form,
      sheetPhoneNumber,
      emailPhoneNumber,
    });

    setIsSubmitting(false);

    if (result.success) {
      setShowConfirmation(true);
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

  const phoneMaxLength = countryCode !== 'Other' ? countryCodes[countryCode as CountryCode]?.length : undefined;


  return (
    <>
      <Card className="neumorphic-outer w-full max-w-lg">
        <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tighter text-primary dark:text-primary-foreground">Contact Our Team</CardTitle>
             <CardDescription>
                Have a question about a course? We're here to help.
             </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2 text-left">
                <Label htmlFor="name">Name</Label>
                <div className="neumorphic-inner rounded-md">
                <Input id="name" name="name" placeholder="Your Name" value={form.name} onChange={handleInputChange} required />
                </div>
                {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
            </div>
            <div className="grid gap-2 text-left">
                <Label htmlFor="email">Email</Label>
                <div className="neumorphic-inner rounded-md">
                <Input id="email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleInputChange} required />
                </div>
                {errors.email && <p className="text-destructive text-xs">{errors.email[0]}</p>}
            </div>
            <div className="grid gap-2 text-left">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="flex items-center">
                    <div className="neumorphic-inner rounded-md rounded-r-none w-[130px]">
                      <Select value={countryCode} onValueChange={handleCountryCodeChange}>
                          <SelectTrigger useNeumorphic={false} className="w-full rounded-r-none focus:ring-0 focus:ring-offset-0 border-r bg-transparent shadow-none hover:bg-transparent">
                              <SelectValue>
                                {countryCode === 'Other' ? 'Other' : `${countryCodes[countryCode as CountryCode]?.label} (+${countryCode})`}
                              </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                              {Object.entries(countryCodes).map(([code, {label}]) => (
                                  <SelectItem key={code} value={code}>{label} (+{code})</SelectItem>
                              ))}
                              <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                     {countryCode === 'Other' && (
                        <div className="neumorphic-inner rounded-md rounded-l-none w-[90px] border-l">
                            <Input
                            id="otherCountryCode"
                            name="otherCountryCode"
                            placeholder="Code"
                            value={otherCountryCode}
                            onChange={(e) => setOtherCountryCode(e.target.value.replace(/\D/g, ''))}
                            className="rounded-l-none border-l-0"
                            required
                            />
                        </div>
                     )}
                    <div className="neumorphic-inner rounded-md rounded-l-none w-full border-l">
                      <Input 
                        id="phoneNumber"
                        type="tel" 
                        name="phoneNumber"
                        placeholder={'1234567890'}
                        value={form.phoneNumber} 
                        onChange={handlePhoneNumberChange} 
                        maxLength={phoneMaxLength}
                        className="rounded-l-none"
                        required 
                      />
                    </div>
                </div>
                {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber[0]}</p>}
            </div>
            <div className="grid gap-2 text-left">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your Message..." value={form.message} onChange={handleInputChange} required className="min-h-[120px]" />
                {errors.message && <p className="text-destructive text-xs">{errors.message[0]}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Submitting...</> : 'Submit'}
            </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
                Our language experts will get back to you shortly.
            </p>
        </CardContent>
    </Card>
    <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <div className="flex justify-center items-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2,
                        }}
                        className="h-20 w-20 bg-background neumorphic-outer rounded-full flex items-center justify-center"
                    >
                         <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                                delay: 0.4,
                            }}
                        >
                            <Check className="h-12 w-12 text-green-600" />
                        </motion.div>
                    </motion.div>
                </div>
                <AlertDialogTitle className="text-center text-2xl pt-4">Message Sent!</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    Thank you for reaching out. We will get back to you shortly.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
                <AlertDialogAction onClick={handleConfirmation}>OK</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
