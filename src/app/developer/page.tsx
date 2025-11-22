
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DeveloperPage() {
  const developer = {
    name: 'Sakthivel Arumugam',
    title: 'Full Stack Developer',
    email: 'sakthiarumugam106@gmail.com',
    phone: '+917708071872',
    linkedin: 'https://www.linkedin.com/in/sakthivel-arumugam-49479721a',
    profileImage: 'https://media.licdn.com/dms/image/v2/D5603AQEZrR6-ddoo6g/profile-displayphoto-shrink_800_800/B56ZTzScqrHQAg-/0/1739248487934?e=1765411200&v=beta&t=2LVv38Vr-UAKkMid-0IqC5lVhtL4K3pnPmYs1WHUAd4',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://www.linkedin.com/in/sakthivel-arumugam-49479721a',
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="neumorphic-outer w-full max-w-4xl overflow-hidden">
        <CardContent className="p-0 flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 bg-primary/10 flex flex-col items-center justify-center p-8 text-center">
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full neumorphic-outer p-2">
              <Image
                src={developer.profileImage}
                alt={developer.name}
                width={200}
                height={200}
                className="rounded-full object-cover"
                data-ai-hint="developer portrait"
              />
            </div>
            <div className="mt-6">
              <div className="p-4 rounded-lg neumorphic-inner">
                <Image
                  src={developer.qrCode}
                  alt="LinkedIn QR Code"
                  width={100}
                  height={100}
                  className="rounded-md"
                  data-ai-hint="QR code"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Scan to Connect</p>
            </div>
          </div>

          <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-foreground flex items-center gap-3">
              <span>👨‍💻</span> {developer.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground dark:text-foreground/80">{developer.title}</p>
            
            <div className="mt-8 space-y-4 text-md">
              <Link href={`mailto:${developer.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary dark:text-foreground/80 dark:hover:text-primary-foreground transition-colors">
                <Mail className="w-5 h-5 text-primary/80" />
                <span>{developer.email}</span>
              </Link>
              <Link href={`tel:${developer.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary dark:text-foreground/80 dark:hover:text-primary-foreground transition-colors">
                <Phone className="w-5 h-5 text-primary/80" />
                <span>{developer.phone}</span>
              </Link>
              <Link href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary dark:text-foreground/80 dark:hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5 text-primary/80" />
                <span>LinkedIn Profile</span>
              </Link>
            </div>

            <div className="mt-10">
              <Button asChild useNeumorphic={false}>
                <Link href={`mailto:${developer.email}`}>Contact Me</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
