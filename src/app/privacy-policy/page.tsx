
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-primary/5 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary dark:text-primary-foreground">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-lg max-w-none">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Verbigo ("us", "we", or "our") operates the Verbigo website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
            
            <h2 className="text-xl font-semibold text-primary dark:text-primary-foreground">Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            
            <h3 className="text-lg font-semibold text-primary dark:text-primary-foreground">Types of Data Collected</h3>
            <p><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Phone number, Cookies and Usage Data.</p>
            <p><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
            
            <h2 className="text-xl font-semibold text-primary dark:text-primary-foreground">Use of Data</h2>
            <p>Verbigo uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-primary dark:text-primary-foreground">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us by visiting the contact page on our website.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
