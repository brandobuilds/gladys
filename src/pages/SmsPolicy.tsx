import React from 'react';
import PolicyContent from '../components/policy/PolicyContent';

export default function SmsPolicy() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-forest mb-6">SMS Notification Policy</h1>
      <PolicyContent />
    </div>
  );
}