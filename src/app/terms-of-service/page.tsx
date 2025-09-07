
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="bg-primary/5 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-lg max-w-none">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Verbigo website (the "Service") operated by Verbigo ("us", "we", or "our").</p>
            <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.</p>
            
            <h2 className="text-xl font-semibold text-primary">Accounts</h2>
            <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>
            
            <h2 className="text-xl font-semibold text-primary">Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Verbigo and its licensors. The Service is protected by copyright, trademark, and other laws of both the and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Verbigo.</p>
            
            <h2 className="text-xl font-semibold text-primary">Termination</h2>
            <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
            
            <h2 className="text-xl font-semibold text-primary">Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of our country, without regard to its conflict of law provisions.</p>
            
            <h2 className="text-xl font-semibold text-primary">Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2 className="text-xl font-semibold text-primary">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
