import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WhatsAppIcon } from '@/components/whatsapp-button';
import { GraduationCap, Languages, Laptop, MessageSquareQuote, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const values = [
    {
        icon: <MessageSquareQuote className="h-10 w-10 text-primary" />,
        title: 'Empower through communication',
        description: 'Clear communication transforms lives. It builds confidence, opens opportunities, and fuels personal growth.',
    },
    {
        icon: <Languages className="h-10 w-10 text-primary" />,
        title: 'Bridge gaps through language',
        description: 'Language should connect, not divide. We make English approachable for those left behind by traditional methods.',
    },
    {
        icon: <TrendingUp className="h-10 w-10 text-primary" />,
        title: 'Treat language as a tool for growth',
        description: "English isn't just a subject. It's a skill that can unlock better opportunities, whether it's for work, study, or self-expression.",
    },
    {
        icon: <GraduationCap className="h-10 w-10 text-primary" />,
        title: 'Learner First approach',
        description: 'We design every course around the person learning it. Their pace, their comfort, their goals. Learning works best when it adapts to the learner.',
    },
    {
        icon: <Laptop className="h-10 w-10 text-primary" />,
        title: 'Blending Education & Technology',
        description: "As a language hub we're trying to utilize technology to its best and become a game changer in the field of language learning.",
    },
];

export default function OurValuesPage() {
    const phoneNumber = '15551234567';
    const message = "Hello Verbigo! I'm interested in learning more about your values and courses.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <section className="bg-background py-16 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-1 space-y-6">
                        <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
                            Our Core <span className="text-destructive">Values</span>
                        </h1>
                        <p className="text-muted-foreground md:text-lg">
                            At Verbigo, our core values shape every lesson and interaction.
                        </p>
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon />
                            WhatsApp Now
                          </Link>
                        </Button>
                    </div>
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="flex flex-col justify-start transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 ease-in-out">
                                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                    {value.icon}
                                    <CardTitle className="text-xl font-semibold text-primary">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                         <Card className="flex flex-col justify-center items-center bg-primary/5 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 ease-in-out">
                            <CardContent className="text-center p-6">
                                <h3 className="text-xl font-bold text-primary mb-2">And so much more...</h3>
                                <p className="text-muted-foreground">We are constantly evolving to meet the needs of our learners.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
