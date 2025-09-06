
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
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Progress } from './ui/progress';

const initialState: ApplicationFormState = {
  message: '',
  success: false,
};

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending || disabled}>
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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

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
        setResumeFile(null);
        if (resumeInputRef.current) resumeInputRef.current.value = '';
        setIsOpen(false);
      }
    }
    setIsUploading(false);
    setUploadProgress(null);
  }, [state, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
            title: 'File too large',
            description: 'Please select a file smaller than 5MB.',
            variant: 'destructive',
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;

    if (!resumeFile) {
        toast({ title: 'Error', description: 'Please select a resume file to upload.', variant: 'destructive' });
        return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);

    try {
        const fileExtension = resumeFile.name.split('.').pop();
        const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
        const storageRef = ref(storage, `resumes/${sanitizedName}_${Date.now()}.${fileExtension}`);
        
        // This is a simplified progress simulation. For real progress, you would use uploadBytesResumable
        const uploadTask = uploadBytes(storageRef, resumeFile);
        
        // Simulate progress
        const interval = setInterval(() => {
            setUploadProgress(oldProgress => {
                if (oldProgress === null) return 0;
                if (oldProgress >= 90) return 95;
                return oldProgress + 10;
            });
        }, 200);

        await uploadTask;
        clearInterval(interval);
        setUploadProgress(100);

        const downloadURL = await getDownloadURL(storageRef);
        formData.set('resume', downloadURL);
        
        // Now call the server action with the updated form data
        formAction(formData);

    } catch (error) {
        console.error("File upload error:", error);
        toast({ title: 'Error uploading file', description: 'Could not upload your resume. Please try again.', variant: 'destructive' });
        setIsUploading(false);
        setUploadProgress(null);
    }
  };

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
        <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
            <input type="hidden" name="resume" />
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
                <Label htmlFor="resume-file">Upload Resume (PDF, DOCX)</Label>
                <Input id="resume-file" name="resume-file" type="file" required accept=".pdf,.doc,.docx" onChange={handleFileChange} ref={resumeInputRef} />
                 {isUploading && uploadProgress !== null && (
                    <div className="space-y-1 mt-2">
                        <p className="text-sm text-muted-foreground">Uploading: {uploadProgress.toFixed(0)}%</p>
                        <Progress value={uploadProgress} className="h-2" />
                    </div>
                )}
                {state.errors?.resume && <p className="text-sm text-destructive mt-1">{state.errors.resume[0]}</p>}
            </div>
            <SubmitButton disabled={isUploading}/>
            </form>
      </DialogContent>
    </Dialog>
  );
}
