import React from 'react';
import { Mail, MessageSquare, Github } from 'lucide-react';

export default function Help() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-forest mb-6">Help & Support</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-forest mb-4">Contact Us</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="mailto:support@meetgladys.com"
              className="flex items-center gap-3 p-4 rounded-lg border border-mist hover:border-forest hover:bg-mist-light/50 transition-colors"
            >
              <Mail className="text-forest" size={24} />
              <div>
                <h3 className="font-medium text-charcoal">Email Support</h3>
                <p className="text-sm text-sage">support@meetgladys.com</p>
              </div>
            </a>

            <a
              href="sms:+18005555555"
              className="flex items-center gap-3 p-4 rounded-lg border border-mist hover:border-forest hover:bg-mist-light/50 transition-colors"
            >
              <MessageSquare className="text-forest" size={24} />
              <div>
                <h3 className="font-medium text-charcoal">Text Support</h3>
                <p className="text-sm text-sage">Send us a text message</p>
              </div>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-forest mb-4">FAQs</h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-mist-light/50 hover:bg-mist-light transition-colors">
                <span className="font-medium text-charcoal">How do I create a new reminder?</span>
                <span className="text-sage transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 text-charcoal">
                Click the plus (+) button in the "Your Nags" section to create a new reminder. You can set the title,
                schedule, and notification preferences for your reminder.
              </div>
            </details>

            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-mist-light/50 hover:bg-mist-light transition-colors">
                <span className="font-medium text-charcoal">How do SMS notifications work?</span>
                <span className="text-sage transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 text-charcoal">
                After opting in to SMS notifications and adding your phone number in Settings, you'll receive text
                messages for your reminders. You can customize notification settings for each reminder.
              </div>
            </details>

            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-mist-light/50 hover:bg-mist-light transition-colors">
                <span className="font-medium text-charcoal">Can I customize reminder schedules?</span>
                <span className="text-sage transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 text-charcoal">
                Yes! When creating or editing a reminder, you can choose specific days and times, or set up random
                intervals within a time range. You can also enable follow-up confirmations.
              </div>
            </details>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-forest mb-4">Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="https://github.com/brandobuilds/gladys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-mist hover:border-forest hover:bg-mist-light/50 transition-colors"
            >
              <Github className="text-forest" size={24} />
              <div>
                <h3 className="font-medium text-charcoal">GitHub Repository</h3>
                <p className="text-sm text-sage">View source code and contribute</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}