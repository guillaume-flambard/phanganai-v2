import React from 'react';

interface MobileLayoutProps {
    children: React.ReactNode;
    className?: string; // Allow passing className for custom styling if needed
}

export function MobileLayout({ children, className }: MobileLayoutProps) {
    return (
        <div className={`min-h-screen relative overflow-x-hidden pb-24 ${className || ''}`}>
            {/* iOS Status Bar Spacer */}
            <div className="h-12 w-full" />

            {/* Main Content */}
            <main className="w-full max-w-md mx-auto relative z-10">
                {children}
            </main>

            {/* Background Effects (Optional global effects can go here) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />
            </div>

            {/* iOS Home Indicator Area */}
            <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/20 w-32 mx-auto rounded-full mb-2 pointer-events-none z-[60]" />
        </div>
    );
}
