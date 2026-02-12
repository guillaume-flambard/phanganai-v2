import React from 'react';
import { Wallet, CheckCircle, CreditCard, Lock } from 'lucide-react';

export function PaymentMethods() {
    return (
        <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white/50 font-bold">Select Payment</h3>

            {/* Wallet Option (Selected) */}
            <div className="relative group cursor-pointer">
                <input defaultChecked className="hidden peer" id="wallet" name="payment" type="radio" />
                <label htmlFor="wallet" className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border-2 border-primary transition-all peer-checked:bg-primary/20 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <span className="font-bold">PhanganAI Wallet</span>
                            <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs text-primary/80">Balance: ฿1,250</span>
                    </div>
                </label>
            </div>

            {/* Credit Card Option */}
            <div className="relative group cursor-pointer">
                <input className="hidden peer" id="omise" name="payment" type="radio" />
                <label htmlFor="omise" className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border-2 border-white/10 transition-all peer-checked:border-primary peer-checked:bg-primary/10 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white/60" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-white/80">Credit Card</span>
                            <div className="flex gap-1">
                                <div className="w-6 h-4 bg-white/10 rounded-sm"></div>
                                <div className="w-6 h-4 bg-white/10 rounded-sm"></div>
                            </div>
                        </div>
                        <span className="text-xs text-white/40">Secure checkout via Omise</span>
                    </div>
                </label>
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
                <Lock className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-tighter font-medium">SSL Encrypted Secure Transaction</span>
            </div>
        </div>
    );
}
