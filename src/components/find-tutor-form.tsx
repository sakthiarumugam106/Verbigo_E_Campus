
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { IndianStatesAndLanguages } from '@/lib/india-states-languages';

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
  const { toast } = useToast();

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

  const handleLanguageChange = (value: string) => {
    if (value === 'Other') {
      setFormData(prev => ({ ...prev, language: 'Other' }));
    } else {
      setFormData(prev => ({ ...prev, language: value }));
      setOtherLanguage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, whatsapp, state, language, schedule } = formData;
    const finalLanguage = language === 'Other' ? otherLanguage : language;

    if (!name || !email || !whatsapp || !state || !finalLanguage || !schedule) {
      toast({
        title: 'Error',
        description: 'Please fill out all the fields.',
        variant: 'destructive',
      });
      return;
    }
    
    const phoneNumber = '7708071872'; // Your WhatsApp number
    const message = `
      New Tutor Request!
      -----------------------------
      Name: ${name}
      Email: ${email}
      WhatsApp: ${whatsapp}
      State: ${state}
      Native Language: ${finalLanguage}
      Schedule Preference: ${schedule}
      -----------------------------
      Please get back to me soon.
    `;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
        title: 'Redirecting to WhatsApp!',
        description: 'Your message has been prepared. Please send it to connect with us.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="e.g., Priya Sharma" required onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="priya.sharma@example.com" required onChange={(e) => handleChange('email', e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp Number</Label>
        <Input id="whatsapp" name="whatsapp" type="tel" placeholder="+91 98765 43210" required onChange={(e) => handleChange('whatsapp', e.target.value)} />
      </div>
       <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select name="state" required onValueChange={(value) => handleChange('state', value)}>
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
            />
        </div>
        )}
      <div className="space-y-2 md:col-span-2">
        <Label>Schedule Preference</Label>
        <RadioGroup name="schedule" required className="flex flex-col sm:flex-row gap-4 pt-2" onValueChange={(value) => handleChange('schedule', value)}>
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
        <Button type="submit" className="w-full max-w-xs" size="lg">Submit & Chat on WhatsApp</Button>
      </div>
    </form>
  );
}
