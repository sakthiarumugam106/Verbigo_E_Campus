
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitDemoRequest, type DemoFormState } from '@/app/get-demo/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const initialState: DemoFormState = {
  message: '',
  success: false,
};

const countryCodes = {
  '91': { label: 'IN', length: 10 },
  '1': { label: 'US', length: 10 },
  '44': { label: 'UK', length: 10 },
  '61': { label: 'AU', length: 9 },
};
type CountryCode = keyof typeof countryCodes;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

export function GetDemoForm() {
  const [state, formAction] = useActionState(submitDemoRequest, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode | 'Other'>('91');
  const [otherCountryCode, setOtherCountryCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if(state.message === '') return;
    
    if (state.success) {
      setShowConfirmation(true);
    } else {
        toast({
            title: 'Error',
            description: state.message,
            variant: 'destructive',
        });
    }
  }, [state, toast]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const currentMaxLength = countryCode !== 'Other' ? countryCodes[countryCode as CountryCode]?.length : undefined;
    if (/^\d*$/.test(value) && (!currentMaxLength || value.length <= currentMaxLength)) {
      setPhoneNumber(value);
    }
  };

  const handleCountryCodeChange = (value: string) => {
    setPhoneNumber('');
    if (value === 'Other') {
      setCountryCode(value as 'Other');
      setOtherCountryCode('');
    } else {
      setCountryCode(value as CountryCode);
    }
  };

  const handleFormAction = (formData: FormData) => {
    const finalCountryCode = countryCode === 'Other' ? otherCountryCode : countryCode;
    const fullPhoneNumber = `+${finalCountryCode} ${phoneNumber}`;
    formData.set('phoneNumber', fullPhoneNumber);
    formAction(formData);
  };
  
  const phoneMaxLength = countryCode !== 'Other' ? countryCodes[countryCode as CountryCode]?.length : undefined;

  const handleConfirmation = () => {
    setShowConfirmation(false);
    formRef.current?.reset();
    setPhoneNumber('');
    setCountryCode('91');
    setOtherCountryCode('');
  };

  return (
    <>
    <form ref={formRef} action={handleFormAction} className="space-y-6">
      <input type="hidden" name="phoneNumber" />
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
        <Label htmlFor="phoneNumberInput">Phone Number</Label>
        <div className="flex items-center">
          <Select value={countryCode} onValueChange={handleCountryCodeChange}>
            <SelectTrigger className="w-[120px] rounded-r-none focus:ring-0 focus:ring-offset-0 border-r-0">
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
                className="rounded-l-none border-l-0 w-[80px]"
                required
              />
          ) : (
              <Input 
                id="phoneNumberInput"
                type="tel" 
                name="phoneNumberInput"
                placeholder="1234567890"
                value={phoneNumber} 
                onChange={handlePhoneNumberChange} 
                maxLength={phoneMaxLength}
                className="rounded-l-none"
                required 
              />
          )}
        </div>
        {countryCode === 'Other' && (
          <div className="grid gap-2 text-left mt-2">
            <Label htmlFor="phoneNumberOther">Phone Number</Label>
            <Input 
                id="phoneNumberOther"
                type="tel" 
                name="phoneNumberInput"
                placeholder="1234567890"
                value={phoneNumber} 
                onChange={handlePhoneNumberChange}
                required 
              />
          </div>
        )}
        {state.errors?.phoneNumber && <p className="text-sm text-destructive mt-1">{state.errors.phoneNumber[0]}</p>}
      </div>
      <SubmitButton />
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
                        className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center"
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
                <AlertDialogTitle className="text-center text-2xl pt-4">Request Submitted!</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    Thank you for your interest. Our team will contact you shortly to schedule your demo.
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
