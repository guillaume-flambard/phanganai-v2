import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    children: React.ReactNode;
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary text-background-dark shadow-[0_0_30px_rgba(19,236,91,0.3)] hover:brightness-110 active:scale-95",
        secondary: "bg-white/10 text-white hover:bg-white/20 active:scale-95 border border-white/5",
        glass: "glass-card text-primary hover:bg-primary/20 hover:border-primary/30 active:scale-95",
    };

    const sizes = {
        sm: "h-8 px-4 text-xs",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
