import React from 'react';
import PolicySection from './PolicySection';

export default function PolicyContent() {
  return (
    <div className="prose prose-forest max-w-none">
      <PolicySection title="Overview">
        <p className="text-charcoal">
          This policy explains how Gladys uses SMS notifications to help you stay on track with your reminders
          and tasks. By opting in to SMS notifications, you agree to receive text messages from our service.
        </p>
      </PolicySection>

      <PolicySection title="What You'll Receive">
        <ul className="list-disc pl-6 space-y-2 text-charcoal">
          <li>Scheduled reminder messages based on your preferences</li>
          <li>Follow-up messages requesting confirmation of task completion</li>
          <li>Important updates about your account or service changes</li>
          <li>Responses to your SMS commands or inquiries</li>
        </ul>
      </PolicySection>

      <PolicySection title="Message Frequency">
        <p className="text-charcoal">
          The frequency of messages depends on your configured reminders. You'll receive:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-charcoal">
          <li>One message per scheduled reminder</li>
          <li>Optional follow-up messages if enabled</li>
          <li>Occasional service updates (limited to important announcements)</li>
        </ul>
      </PolicySection>

      <PolicySection title="Opting Out">
        <p className="text-charcoal">
          You can opt out of SMS notifications at any time by:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-charcoal">
          <li>Toggling off SMS notifications on this page</li>
          <li>Replying STOP to any message from Gladys</li>
          <li>Contacting our support team</li>
        </ul>
      </PolicySection>

      <PolicySection title="Costs">
        <p className="text-charcoal">
          While Gladys does not charge for SMS notifications, standard message and data rates from your
          carrier may apply. Please check with your mobile service provider for details about your messaging
          plan and any costs associated with receiving SMS messages.
        </p>
      </PolicySection>

      <PolicySection title="Privacy & Security">
        <p className="text-charcoal">
          We take your privacy seriously. Your phone number and message history are:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-charcoal">
          <li>Encrypted and stored securely</li>
          <li>Never shared with third parties for marketing purposes</li>
          <li>Only used to deliver the services you've requested</li>
          <li>Handled in accordance with our Privacy Policy</li>
        </ul>
      </PolicySection>

      <PolicySection title="Contact Us">
        <p className="text-charcoal">
          If you have questions about our SMS notification policy or need assistance, please contact our
          support team at support@meetgladys.com
        </p>
      </PolicySection>
    </div>
  );
}