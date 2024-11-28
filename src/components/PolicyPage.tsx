import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onClose: () => void;
  smsOptIn: boolean;
  onOptInChange: (checked: boolean) => void;
}

export default function PolicyPage({ onClose, smsOptIn, onOptInChange }: Props) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-sage hover:text-forest hover:bg-mist-light transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-forest">SMS Notification Policy</h1>
        </div>

        {/* SMS Opt-in Control */}
        <div className="bg-mist-light/50 p-4 rounded-lg mb-8">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="smsOptIn"
              checked={smsOptIn}
              onChange={(e) => onOptInChange(e.target.checked)}
              className="rounded border-mist text-forest focus:ring-forest h-5 w-5"
            />
            <label htmlFor="smsOptIn" className="text-charcoal font-medium">
              I agree to receive SMS notifications from Gladys
            </label>
          </div>
          <p className="text-sage text-sm mt-2 ml-8">
            You can change this setting at any time
          </p>
        </div>

        <div className="prose prose-forest max-w-none">
          {/* Rest of the policy content remains the same */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-forest mb-4">Overview</h2>
            <p className="text-charcoal mb-4">
              This policy explains how Gladys uses SMS notifications to help you stay on track with your reminders
              and tasks. By opting in to SMS notifications, you agree to receive text messages from our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-forest mb-4">What You'll Receive</h2>
            <ul className="list-disc pl-6 space-y-2 text-charcoal">
              <li>Scheduled reminder messages based on your preferences</li>
              <li>Follow-up messages requesting confirmation of task completion</li>
              <li>Important updates about your account or service changes</li>
              <li>Responses to your SMS commands or inquiries</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-forest mb-4">Message Frequency</h2>
            <p className="text-charcoal mb-4">
              The frequency of messages depends on your configured reminders. You'll receive:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-charcoal">
              <li>One message per scheduled reminder</li>
              <li>Optional follow-up messages if enabled</li>
              <li>Occasional service updates (limited to important announcements)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-forest mb-4">Opting Out</h2>
            <p className="text-charcoal mb-4">
              You can opt out of SMS notifications at any time by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-charcoal">
              <li>Toggling off SMS notifications on this page</li>
              <li>Replying STOP to any message from Gladys</li>
              <li>Contacting our support team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-forest mb-4">Costs</h2>
            <p className="text-charcoal mb-4">
              While Gladys does not charge for SMS notifications, standard message and data rates from your
              carrier may apply. Please check with your mobile service provider for details about your messaging
              plan and any costs associated with receiving SMS messages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-forest mb-4">Privacy & Security</h2>
            <p className="text-charcoal mb-4">
              We take your privacy seriously. Your phone number and message history are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-charcoal">
              <li>Encrypted and stored securely</li>
              <li>Never shared with third parties for marketing purposes</li>
              <li>Only used to deliver the services you've requested</li>
              <li>Handled in accordance with our Privacy Policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-forest mb-4">Contact Us</h2>
            <p className="text-charcoal">
              If you have questions about our SMS notification policy or need assistance, please contact our
              support team at support@meetgladys.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}