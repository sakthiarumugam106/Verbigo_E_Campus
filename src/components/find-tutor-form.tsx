
'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { IndianStatesAndLanguages } from '@/lib/india-states-languages';
import { whatsapp } from '@/lib/config';
import { sendTutorRequestEmail } from '@/app/find-tutor/actions';
import { Loader2, Check } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';
import { useLoading } from './loading-provider';
import { cn } from '@/lib/utils';

const countryCodes = {
  '91': { label: 'IN', length: 10 },
  '1': { label: 'US', length: 10 },
  '44': { label: 'UK', length: 10 },
  '61': { label: 'AU', length: 9 },
};

type CountryCode = keyof typeof countryCodes;

export function FindTutorForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    state: '',
    language: '',
    schedule: '',
  });
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [otherLanguage, setOtherLanguage] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode | 'Other'>('91');
  const [otherCountryCode, setOtherCountryCode] = useState('');
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();


  useEffect(() => {
    if (formData.state) {
      const selectedState = IndianStatesAndLanguages.find(s => s.state === formData.state);
      setAvailableLanguages(selectedState ? selectedState.languages : []);
      setFormData(prev => ({ ...prev, language: '' }));
      setOtherLanguage('');
    } else {
      setAvailableLanguages([]);
    }
  }, [formData.state]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const currentMaxLength = countryCode !== 'Other' ? countryCodes[countryCode as CountryCode]?.length : undefined;
    // Only allow numbers and limit length
    if (/^\d*$/.test(value) && (!currentMaxLength || value.length <= currentMaxLength)) {
      handleChange('whatsapp', value);
    }
  };

  const handleCountryCodeChange = (value: string) => {
    handleChange('whatsapp', ''); // Reset phone number on country change
    if (value === 'Other') {
      setCountryCode(value as 'Other');
      setOtherCountryCode('');
    } else {
      setCountryCode(value as CountryCode);
    }
  };


  const handleLanguageChange = (value: string) => {
    if (value === 'Other') {
      setFormData(prev => ({ ...prev, language: 'Other' }));
    } else {
      setFormData(prev => ({ ...prev, language: value }));
      setOtherLanguage('');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      state: '',
      language: '',
      schedule: '',
    });
    setOtherLanguage('');
    setCountryCode('91');
    setOtherCountryCode('');
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    resetForm();
    showLoader();
    router.push('/');
    setTimeout(hideLoader, 1000);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalLanguage = formData.language === 'Other' ? otherLanguage : formData.language;
    const finalCountryCode = countryCode === 'Other' ? otherCountryCode : countryCode;
    
    const finalFormData = { ...formData, language: finalLanguage, whatsapp: `+${finalCountryCode} ${formData.whatsapp}` };

    if (!finalFormData.name || !finalFormData.email || !formData.whatsapp || !finalFormData.state || !finalFormData.language || !finalFormData.schedule) {
      toast({
        title: 'Error',
        description: 'Please fill out all the fields.',
        variant: 'destructive',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalFormData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    
    showLoader();
    
    // Open WhatsApp link immediately for the user
    const whatsappUrl = whatsapp.getTutorInquiryUrl(finalFormData);
    window.open(whatsappUrl, '_blank');

    toast({
        title: 'Redirecting to WhatsApp!',
        description: 'Your message has been prepared. Please send it to connect with us.',
    });

    setShowConfirmation(true);

    // Send email in the background
    startTransition(async () => {
        const result = await sendTutorRequestEmail(finalFormData);
        hideLoader();
        if (result.success) {
            console.log('Tutor request email sent successfully.');
        } else {
            console.error('Failed to send tutor request email:', result.error);
            // Optionally, you could show a silent error or log it.
        }
    });

  };

  const phoneMaxLength = countryCode !== 'Other' ? countryCodes[countryCode as CountryCode]?.length : undefined;


  return (
    <>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="e.g., Priya Sharma" required onChange={(e) => handleChange('name', e.target.value)} value={formData.name} className="neumorphic-inner"/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="priya.sharma@example.com" required onChange={(e) => handleChange('email', e.target.value)} value={formData.email} className="neumorphic-inner"/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp Number</Label>
        <div className={cn("flex items-center rounded-md", countryCode !== 'Other' && 'neumorphic-inner')}>
            <Select value={countryCode} onValueChange={handleCountryCodeChange}>
                <SelectTrigger className="w-[120px] rounded-r-none focus:ring-0 focus:ring-offset-0 border-r bg-transparent shadow-none hover:bg-transparent">
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
            {countryCode === 'Other' ? (
                <Input
                  id="otherCountryCode"
                  name="otherCountryCode"
                  placeholder="Code"
                  value={otherCountryCode}
                  onChange={(e) => setOtherCountryCode(e.target.value.replace(/\D/g, ''))}
                  className="rounded-l-none border-l-0 w-[80px] neumorphic-inner"
                  required
                />
            ) : (
                <Input 
                  id="whatsapp"
                  type="tel" 
                  name="whatsapp"
                  placeholder="1234567890"
                  value={formData.whatsapp} 
                  onChange={handlePhoneNumberChange} 
                  maxLength={phoneMaxLength}
                  className="rounded-l-none"
                  required 
                />
            )}
        </div>
      </div>
       <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select name="state" required onValueChange={(value) => handleChange('state', value)} value={formData.state}>
          <SelectTrigger>
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {IndianStatesAndLanguages.map((s) => (
              <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="language">Native Language</Label>
        <Select name="language" required disabled={!formData.state} onValueChange={handleLanguageChange} value={formData.language}>
          <SelectTrigger>
            <SelectValue placeholder={formData.state ? "Select your language" : "Select a state first"} />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((lang) => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
       {formData.language === 'Other' && (
        <div className="space-y-2">
            <Label htmlFor="otherLanguage">Please specify your language</Label>
            <Input
            id="otherLanguage"
            name="otherLanguage"
            placeholder="Your language"
            required
            value={otherLanguage}
            onChange={(e) => setOtherLanguage(e.target.value)}
            className="neumorphic-inner"
            />
        </div>
        )}
      <div className="space-y-2 md:col-span-2">
        <Label>Schedule Preference</Label>
        <RadioGroup name="schedule" required className="flex flex-col sm:flex-row gap-4 pt-2" onValueChange={(value) => handleChange('schedule', value)} value={formData.schedule}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Weekends" id="weekends" />
            <Label htmlFor="weekends">Weekends</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Weekdays" id="weekdays" />
            <Label htmlFor="weekdays">Weekdays</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Any" id="any" />
            <Label htmlFor="any">Any Time</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="md:col-span-2 text-center mt-4">
        <Button type="submit" className="w-full max-w-xs" size="lg" disabled={isPending}>
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                'Submit & Chat'
            )}
        </Button>
      </div>
    </form>
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
                <AlertDialogTitle className="text-center text-2xl pt-4">Thanks for choosing Verbigo!</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    Your request has been sent. We'll be in touch with you shortly on WhatsApp.
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
