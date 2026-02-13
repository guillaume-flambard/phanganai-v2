import React from 'react';

interface MobileLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileLayout({ children, className }: MobileLayoutProps) {
    return (
        <div className={`min-h-screen relative overflow-x-hidden pb-24 lg:pb-8 ${className || ''}`}>
            {/* Background Decoration Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="jungle-gradient absolute inset-0" />
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
            </div>

            {/* Main Content */}
            <main className="w-full max-w-md lg:max-w-6xl mx-auto relative z-10 px-5 lg:px-8 pt-4">
                {children}
            </main>
        </div>
    );
}
