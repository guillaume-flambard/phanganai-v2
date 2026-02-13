'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.replace('/');
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background-dark" />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(19,236,91,0.1) 0%, transparent 70%)',
            top: '-10%',
            right: '-15%',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(19,236,91,0.06) 0%, transparent 70%)',
            bottom: '-15%',
            left: '-10%',
          }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 jungle-mesh opacity-15" />
      </div>

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Pulsing ring + spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ border: '1.5px solid rgba(19,236,91,0.2)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="w-full h-full rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(19,236,91,0.08)',
              border: '1px solid rgba(19,236,91,0.15)',
              boxShadow: '0 0 30px rgba(19,236,91,0.15)',
            }}
          >
            <span className="material-icons text-primary text-3xl animate-spin">sync</span>
          </div>
        </div>
        <p className="text-white/40 text-sm">Signing you in...</p>
      </motion.div>
    </div>
  );
}
