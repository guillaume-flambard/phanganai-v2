import React from 'react';

export function OrderSummary() {
    return (
        <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-white/50 font-bold mb-4">Order Summary</h3>
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-white/80">1x Early Bird Ticket</span>
                    <span className="font-bold">฿600</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-white/50">Service Fee</span>
                    <span className="text-white/50">฿30</span>
                </div>
                <div className="pt-3 border-t border-primary/10 flex justify-between items-center">
                    <span className="font-bold text-primary">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">฿630</span>
                </div>
            </div>
        </div>
    );
}
