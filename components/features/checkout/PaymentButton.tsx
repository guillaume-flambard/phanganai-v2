import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';

export function PaymentButton() {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-20">
            <div className="max-w-md mx-auto">
                <Button className="w-full h-16 text-lg font-black gap-2 shadow-[0_8px_20px_-4px_#13ec5b66]">
                    CONFIRM PAYMENT
                    <ArrowRight className="w-5 h-5" />
                </Button>
                {/* Home Indicator Spacer */}
                <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto mt-6 pointer-events-none"></div>
            </div>
        </div>
    );
}
