import React from 'react';

export function PeakEnergyNow() {
    return (
        <section className="mb-10">
            <h3 className="text-sm font-bold tracking-widest text-primary/80 uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Peak Energy Now
            </h3>

            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-primary/20">
                    <img
                        alt="Live Party"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT7jkVTn0GoGoVK2qJVH6BgM0eRX7c6eEhEDCTWGPDj9dLGvpJbG78j7OFbQzvZz3CgF0K_NOJ1v1hyCiXLJrYzVR2bWN0gDZinqQwIksyKvsLeht-493zTYeZfeMcnQE1XefGNtItkdZ6jcO3MHkJqvpDgQUjBqLA5x_T5jNmpCLHxZ9lXlS19dDVG3ABHGebY8XkA64muoaUx0rY-PlPlS8Mq_yB2q4G7HrJScXCWIih3pfB6ng6O15Pqsw2rMD6_T3WaDOYBEY"
                    />
                </div>
                <div className="flex-1">
                    <h5 className="text-sm font-bold uppercase">Guy&apos;s Bar Jungle Session</h5>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex -space-x-1">
                            <div className="w-5 h-5 rounded-full border border-background-dark bg-primary/40 overflow-hidden">
                                <img alt="Attendee" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDeZQCaVAssGQTAhWSLBLSkjLGah_319qcuWRpn6nHpuVl1eNa-mGXDuyWEFcapIRjafiJT_1VtwR7zLyFneP8VleefcI1MvJVB_XaMjztGI_1U6JINUWMcrObBUrLwIqlF5lIsRdcVuo0wgyCH0_2h-lw5ON1ofOht7X1O9SPilAC3A_RFJTzLsachCRIuHdVQAODh998yorwh-Zm4hEGrCsrx1WPObI-21uNCRiUZeIks2JEk4iHBweyvYHT_wdZYPgnry-giLY" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-5 h-5 rounded-full border border-background-dark bg-primary/40 overflow-hidden">
                                <img alt="Attendee" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUIfS94RRZ_vasYcDUVVX7xj8sFxapwQbU9AeZixM4DxxZonv7V1-_torciXMcVxE8AyTitbWNMhr2mD61lg7NyTgvnSMF0sN9QoXfn8-VmVuG0bxFE6Q7Bs5nlKqqUIumYhBQyvLSIP0MujTeT62CHVbOlwBgRd1_cyUHqqQzF7IH3D3fovOjWlNXsTpUXpsVlxppPPk1VHCqXM0Tp6twSFTUOOL-JbVEgFUlhIhfvRlzctKemJG1iNYXDvttHSKnrA1idwAtpMc" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-[10px] text-white/40 uppercase font-medium">+420 others there</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-primary font-black text-xs uppercase italic">Hot</span>
                    <span className="material-icons text-primary">trending_up</span>
                </div>
            </div>
        </section>
    );
}
