import React from 'react';

export function HomeHeader() {
    return (
        <header className="px-6 flex justify-between items-center mb-6 pt-2">
            <div>
                <p className="text-primary/60 text-sm font-medium">Sawasdee,</p>
                <h1 className="text-2xl font-bold tracking-tight">Alex Riva</h1>
            </div>
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-primary/30 p-0.5 overflow-hidden">
                    <img
                        className="w-full h-full object-cover rounded-full bg-slate-800"
                        alt="User profile"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsdl0S6QXMYyo8X3wGgExc05-azWDNeUg68AHwJcfZQJ-VPLI8_AJG3BkSBKHQjvlm2AL-5mkEP_bVO7pq3W2C2ltf7V02xSr2GPi0GRFpopqbVM8sqSiwBzhM4PNce9Sx4W-MRaf_tb9roWM4lJv1ONJuv3HrWxQ6FSRhUD8le2AYQwbqXgv2clMVsLhaVyKOh0upmHZtdIMYJGjAI4-TG9t7e-08i6nYzsa07FBplKwN_8zae34SGA2BtwIpHzKoHKwS2oa2Pp0"
                    />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background-dark"></div>
            </div>
        </header>
    );
}
