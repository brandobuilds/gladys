import React, { createContext, useContext, useState } from 'react';

interface TestModeContextType {
  testMode: boolean;
  toggleTestMode: () => void;
}

const TestModeContext = createContext<TestModeContextType | undefined>(undefined);

export function useTestMode() {
  const context = useContext(TestModeContext);
  if (context === undefined) {
    throw new Error('useTestMode must be used within a TestModeProvider');
  }
  return context;
}

export function TestModeProvider({ children }: { children: React.ReactNode }) {
  const [testMode, setTestMode] = useState(false);

  const toggleTestMode = () => {
    setTestMode(prev => !prev);
  };

  return (
    <TestModeContext.Provider value={{ testMode, toggleTestMode }}>
      {children}
    </TestModeContext.Provider>
  );
}