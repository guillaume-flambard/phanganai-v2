'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'rgba(26, 46, 32, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(19, 236, 91, 0.15)',
          color: '#f6f8f6',
          fontFamily: 'var(--font-display)',
        },
      }}
      offset={56}
    />
  );
}
