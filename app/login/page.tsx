'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { haptics } from '@/lib/haptics';

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle, signInWithApple } = useAuthContext();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async () => {
    if (!email || loading) return;
    setLoading(true);
    haptics.impact('light');
    const { error } = await signInWithEmail(email);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Check your email for the magic link!');
    }
  };

  const handleGoogle = async () => {
    haptics.impact('light');
    const { error } = await signInWithGoogle();
    if (error) toast.error(error.message);
  };

  const handleApple = async () => {
    haptics.impact('light');
    const { error } = await signInWithApple();
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6">

      {/* === LAYERED ATMOSPHERIC BACKGROUND === */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background-dark" />

        {/* Deep layer: large slow-moving orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(19,236,91,0.12) 0%, transparent 70%)',
            top: '-15%',
            right: '-20%',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(19,236,91,0.08) 0%, transparent 70%)',
            bottom: '-20%',
            left: '-15%',
          }}
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mid layer: smaller accent orbs */}
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(19,236,91,0.06) 0%, transparent 70%)',
            top: '40%',
            left: '10%',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
            top: '20%',
            right: '15%',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mesh texture overlay */}
        <div className="absolute inset-0 jungle-mesh opacity-20" />

        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark/60" />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 w-full max-w-sm">

        {/* --- LOGO & BRANDING --- */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Neon ring icon */}
          <motion.div
            className="relative w-20 h-20 mx-auto mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
          >
            {/* Outer pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/30"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Icon container */}
            <div
              className="w-full h-full rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(19, 236, 91, 0.08)',
                border: '1px solid rgba(19, 236, 91, 0.15)',
                boxShadow: '0 0 30px rgba(19,236,91,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <span className="material-icons text-primary text-4xl">bolt</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            PhanganAI
          </motion.h1>
          <motion.p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: 'rgba(212,175,55,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Powered by OXA
          </motion.p>
        </motion.div>

        {/* --- FORM / SENT STATE --- */}
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(19, 236, 91, 0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(19, 236, 91, 0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(19,236,91,0.05)',
              }}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              {/* Animated check ring */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '2px solid rgba(19,236,91,0.2)' }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(19,236,91,0.1)',
                    border: '1px solid rgba(19,236,91,0.2)',
                  }}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 250, damping: 15 }}
                >
                  <span className="material-icons text-primary text-4xl">mark_email_read</span>
                </motion.div>
              </div>

              <motion.h2
                className="text-xl font-bold mb-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Check your email
              </motion.h2>
              <motion.p
                className="text-white/40 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                We sent a magic link to<br />
                <span className="text-primary font-medium">{email}</span>
              </motion.p>
              <motion.button
                onClick={() => setSent(false)}
                className="mt-8 text-sm text-white/30 hover:text-white/50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Use a different email
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="space-y-5"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Email magic link card */}
              <motion.div
                className="rounded-2xl p-6 space-y-4"
                style={{
                  background: 'rgba(19, 236, 91, 0.04)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(19, 236, 91, 0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(19,236,91,0.05)',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleMagicLink()}
                    className="w-full rounded-full py-3.5 px-5 text-center text-[15px] placeholder:text-white/20 transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(19,236,91,0.3)';
                      e.currentTarget.style.background = 'rgba(19,236,91,0.04)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(19,236,91,0.08)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    autoComplete="email"
                  />
                </div>

                <motion.button
                  onClick={handleMagicLink}
                  disabled={loading || !email}
                  className="w-full py-3.5 rounded-full bg-primary text-background-dark font-bold text-[15px] tracking-wide disabled:opacity-30 transition-all duration-200"
                  style={{
                    boxShadow: email && !loading
                      ? '0 0 30px rgba(19,236,91,0.3), 0 4px 15px rgba(19,236,91,0.2)'
                      : 'none',
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={email && !loading ? { boxShadow: '0 0 40px rgba(19,236,91,0.4), 0 4px 20px rgba(19,236,91,0.3)' } : {}}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-icons text-lg animate-spin">sync</span>
                      Sending...
                    </span>
                  ) : (
                    'Send Magic Link'
                  )}
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="flex items-center gap-4 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>

              {/* Social login buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.button
                  onClick={handleGoogle}
                  className="w-full py-3.5 rounded-full font-medium text-[15px] flex items-center justify-center gap-3 transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </motion.button>

                <motion.button
                  onClick={handleApple}
                  className="w-full py-3.5 rounded-full font-medium text-[15px] flex items-center justify-center gap-3 transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terms footer */}
        <motion.p
          className="text-center text-[11px] text-white/15 mt-10 leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          By continuing, you agree to our{' '}
          <span className="text-white/25 hover:text-white/40 transition-colors cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-white/25 hover:text-white/40 transition-colors cursor-pointer">Privacy Policy</span>
        </motion.p>
      </div>
    </div>
  );
}
