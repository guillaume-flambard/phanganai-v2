'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageTransition } from '@/components/motion/PageTransition';
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
    <MobileLayout>
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
          {/* Logo */}
          <div className="mb-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary text-4xl">bolt</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">PhanganAI</h1>
            <p className="text-xs text-primary/60 uppercase tracking-widest mt-1">Powered by OXA</p>
          </div>

          {sent ? (
            <div className="text-center glass-card rounded-xl p-8 w-full max-w-sm">
              <span className="material-icons text-primary text-5xl mb-4">mark_email_read</span>
              <h2 className="text-xl font-bold mb-2">Check your email</h2>
              <p className="text-white/60 text-sm">We sent a magic link to <span className="text-primary font-medium">{email}</span></p>
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMagicLink()}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-center placeholder:text-white/30 focus:outline-none focus:border-primary/40"
                />
              </div>

              <button
                onClick={handleMagicLink}
                disabled={loading || !email}
                className="w-full py-4 rounded-full bg-primary text-background-dark font-bold text-lg neon-glow active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/30 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogle}
                  className="w-full py-4 rounded-full bg-white/5 border border-white/10 font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                >
                  Continue with Google
                </button>
                <button
                  onClick={handleApple}
                  className="w-full py-4 rounded-full bg-white/5 border border-white/10 font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                >
                  Continue with Apple
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
}
