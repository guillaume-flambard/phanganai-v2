import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    glow?: boolean;
}

export function GlassCard({
    children,
    className,
    glow = false,
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(
                "glass-card rounded-[2rem] p-6 border border-white/5",
                glow && "neon-glow",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
