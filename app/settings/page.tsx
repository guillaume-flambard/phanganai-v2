'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { slideRightVariants } from '../../lib/animations';
import { haptics } from '../../lib/haptics';

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={() => { haptics.impact('light'); onToggle(); }}
            className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-white/20'}`}
            role="switch"
            aria-checked={enabled}
        >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-5' : ''}`} />
        </button>
    );
}

export default function SettingsPage() {
    const router = useRouter();
    const [pushNotifs, setPushNotifs] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(false);
    const [promoNotifs, setPromoNotifs] = useState(true);

    return (
        <AuthGuard>
            <MobileLayout>
                <PageTransition variant={slideRightVariants}>
                <header className="py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"
                        aria-label="Go back"
                    >
                        <span className="material-icons">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">Settings</h1>
                    <div className="w-10" />
                </header>

                <div className="pb-32 space-y-8 mt-4 lg:max-w-3xl lg:mx-auto lg:pb-8">
                    {/* Notifications */}
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary/50 mb-4 ml-1">Notifications</h2>
                        <StaggerList className="space-y-2">
                            <StaggerItem>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons text-white/60">notifications</span>
                                        <span className="font-medium">Push Notifications</span>
                                    </div>
                                    <Toggle enabled={pushNotifs} onToggle={() => setPushNotifs(!pushNotifs)} />
                                </div>
                            </StaggerItem>
                            <StaggerItem>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons text-white/60">email</span>
                                        <span className="font-medium">Email Notifications</span>
                                    </div>
                                    <Toggle enabled={emailNotifs} onToggle={() => setEmailNotifs(!emailNotifs)} />
                                </div>
                            </StaggerItem>
                            <StaggerItem>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons text-white/60">local_offer</span>
                                        <span className="font-medium">Promo & Offers</span>
                                    </div>
                                    <Toggle enabled={promoNotifs} onToggle={() => setPromoNotifs(!promoNotifs)} />
                                </div>
                            </StaggerItem>
                        </StaggerList>
                    </section>

                    {/* Appearance */}
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary/50 mb-4 ml-1">Appearance</h2>
                        <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-icons text-white/60">dark_mode</span>
                                <span className="font-medium">Dark Mode</span>
                            </div>
                            <span className="text-xs text-primary font-bold uppercase">Always On</span>
                        </div>
                    </section>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
                        {/* Privacy */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-primary/50 mb-4 ml-1">Privacy & Security</h2>
                            <StaggerList className="space-y-2">
                                <StaggerItem>
                                    <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-white/60">fingerprint</span>
                                            <span className="font-medium">Biometric Login</span>
                                        </div>
                                        <span className="material-icons text-white/20">chevron_right</span>
                                    </div>
                                </StaggerItem>
                                <StaggerItem>
                                    <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-white/60">privacy_tip</span>
                                            <span className="font-medium">Privacy Policy</span>
                                        </div>
                                        <span className="material-icons text-white/20">chevron_right</span>
                                    </div>
                                </StaggerItem>
                            </StaggerList>
                        </section>

                        {/* About */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-primary/50 mb-4 ml-1">About</h2>
                            <div className="p-4 bg-white/5 rounded-xl space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-white/60">App Version</span>
                                    <span className="font-medium">2.0.0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Build</span>
                                    <span className="font-medium text-white/40">2024.10.27</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                </PageTransition>
            </MobileLayout>
        </AuthGuard>
    );
}
