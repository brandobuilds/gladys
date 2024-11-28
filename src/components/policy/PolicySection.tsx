import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function PolicySection({ title, children }: Props) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-forest mb-4">{title}</h2>
      {children}
    </section>
  );
}