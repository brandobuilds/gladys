import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import TestModePanel from './TestModePanel';

const pageMeta = {
  '/': {
    title: 'Dashboard | Gladys - Your AI Reminder Assistant',
    description: 'Manage your reminders and stay on top of important tasks with Gladys, your personal AI assistant.'
  },
  '/settings': {
    title: 'Settings | Gladys - Your AI Reminder Assistant',
    description: 'Customize your notification preferences and timezone settings for Gladys reminders.'
  },
  '/sms-policy': {
    title: 'SMS Policy | Gladys - Your AI Reminder Assistant',
    description: 'Learn about how Gladys handles SMS notifications and your privacy preferences.'
  },
  '/help': {
    title: 'Help & Support | Gladys - Your AI Reminder Assistant',
    description: 'Get help with using Gladys, your AI reminder assistant. Find FAQs and contact support.'
  }
};

export default function Layout() {
  const [testMode, setTestMode] = useState(false);
  const location = useLocation();
  const meta = pageMeta[location.pathname as keyof typeof pageMeta] || pageMeta['/'];

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <link rel="canonical" href={`https://meetgladys.com${location.pathname}`} />
      </Helmet>

      <div className="min-h-screen bg-mist-light">
        <Header testMode={testMode} onTestModeToggle={() => setTestMode(!testMode)} />
        {testMode && (
          <div className="max-w-4xl mx-auto px-4 mt-4">
            <TestModePanel
              onCreateTestNag={() => {}}
              onTriggerAll={() => {}}
              enabledNagsCount={0}
            />
          </div>
        )}
        <main className="max-w-4xl mx-auto p-4 space-y-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}