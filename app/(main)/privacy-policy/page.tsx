// app/privacy-policy/page.tsx

export const metadata = {
  title: "Privacy Policy - Local Service Provider",
  description: "Read our privacy policy regarding data collection and usage for service providers and users.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 prose prose-neutral dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> [2026]</p>

      <p>Welcome to [Contact Pro] (“we”, “our”, or “us”). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Local Service Provider Page or any related services.</p>

      <h2>1. Information We Collect</h2>
      <h3>a. Service Providers</h3>
      <ul>
        <li>Full Name</li>
        <li>Contact Information (Phone, Email)</li>
        <li>Profile Photo</li>
        <li>Service Categories & Descriptions</li>
        <li>Skills and Certifications</li>
        <li>Location (City, District, or Coordinates via Map)</li>
        <li>Uploaded Images or Files</li>
        <li>Availability and Pricing (if applicable)</li>
      </ul>

      <h3>b. General Users</h3>
      <ul>
        <li>Name</li>
        <li>Contact Information (if booking/contacting providers)</li>
        <li>Location (optional)</li>
        <li>Booking or Inquiry History</li>
      </ul>

      <h3>c. Technical Data</h3>
      <ul>
        <li>IP Address</li>
        <li>Device & Browser Information</li>
        <li>Usage Statistics (e.g., page visits, clicks)</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Display service providers&#39; profiles publicly on the platform</li>
        <li>Enable communication between users and providers</li>
        <li>Verify identity and prevent fraud</li>
        <li>Improve and personalize user experience</li>
        <li>Respond to inquiries and support requests</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>We do <strong>not</strong> sell your personal information. We may share your data with:</p>
      <ul>
        <li>Authorized third-party tools (e.g., map services, cloud storage, analytics)</li>
        <li>Law enforcement or regulators, if required by law</li>
        <li>Other users, in cases where providers choose to publicly list their profile</li>
      </ul>

      <h2>4. Your Choices & Rights</h2>
      <p>You may:</p>
      <ul>
        <li>Update or delete your profile data at any time</li>
        <li>Request to see what personal data we hold about you</li>
        <li>Withdraw your consent (where applicable)</li>
      </ul>
      <p>To make any such requests, contact us at: <strong>send message</strong></p>

      <h2>5. Data Retention</h2>
      <p>We retain your data as long as your account is active or as needed to fulfill the purposes outlined in this policy. If you want delete your account, we will remove your personal information unless required for legal purposes.</p>

      <h2>6. Security</h2>
      <p>We implement reasonable security measures to protect your data from unauthorized access, alteration, or disclosure. However, no system is 100% secure.</p>

      <h2>7. Third-Party Links</h2>
      <p>Our platform may contain links to third-party websites or tools. We are not responsible for their privacy practices.</p>

      <h2>8. Children&#39;s Privacy</h2>
      <p>Our platform is <strong>not intended for children under the age of 10</strong>. If we become aware of personal information collected from a child under 13, we will delete it promptly.</p>

      <h2>9. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated “Effective Date.”</p>

      <h2>10. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
      <ul>
        <li><strong>Email:</strong> mhleon1999@gmail.com</li>
        <li><strong>Address:</strong> Contact Pro</li>
      </ul>
    </main>
  );
}
