import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { useUser } from '../hooks/useUser';

interface Props {
  testMode?: boolean;
  onTestModeToggle?: () => void;
}

export default function Header({ testMode, onTestModeToggle }: Props) {
  const { user } = useUser();

  return (
    <header className="bg-forest text-mist-light py-4 px-4 sticky top-0 z-10 shadow-md">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="/gladys_ai.jpeg"
              alt="Gladys AI"
              className="w-12 h-12 rounded-full object-cover border-2 border-mist-light"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Gladys</h1>
              <p className="text-sm md:text-base text-mist-light/80">
                I nag because I care{user?.displayName ? `, ${user.displayName}` : ''}
              </p>
            </div>
          </Link>
          <Menu testMode={testMode} onTestModeToggle={onTestModeToggle} />
        </div>
      </div>
    </header>
  );
}