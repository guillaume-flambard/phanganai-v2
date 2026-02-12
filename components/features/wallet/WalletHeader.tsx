import React from 'react';
import Link from 'next/link';

export function WalletHeader() {
    return (
        <header className="pt-2 pb-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 bg-surface-dark">
                    <img
                        className="w-full h-full object-cover"
                        alt="User avatar"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtFoHY-8-nSuO6KWUvKD8wFkV0YY_qZxbCjTE_hnC6OFzXwHq3xOb4ro96mCdkh4hSpNdY4etsLPYc3PDeOwXMKxO6Nq7V7UoIYaC8tDGIowQDUBzFzUbUkPmAFYVi6PpxxLFgcqMSZRTGF_Vw30ubMdiOeTj8lQJK7GV8UfGjZbHJBR8-viiGLe27yAhqlwkVl9tBJxDP6s76GX4nO7X-XE_p9-8747xCFsIw_IzTB8YiwvCtnD73PCdIe1WDJs88LL1kqdUZa7k"
                    />
                </div>
                <div>
                    <p className="text-xs text-primary/60 font-medium uppercase tracking-wider">Welcome back</p>
                    <h1 className="text-lg font-bold">Alex Rivera</h1>
                </div>
            </div>
            <Link href="/notifications" className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center border border-primary/10" aria-label="Notifications">
                <span className="material-icons text-primary">notifications</span>
            </Link>
        </header>
    );
}
