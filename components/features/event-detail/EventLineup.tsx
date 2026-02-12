import React from 'react';

const artists = [
    { name: "Makossa", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1nxQH4slBgnSAK7fAeX353Vn0lNpIAw5og-H4LADTqH6Wz8N0d0x-QuArt46GKn3_0Nza_MOQrZ4ZHEFQhn6WHQTN6qGIkiUhMVlLm91qNqVFtR50Jt8czY8HjTM1trGrXAK3oOfHThvAekg7Pfl1E1UpXYzExnw30iEZkxpvN7oK6H7naRL2MafqdY0V064-wTCmvjZoVrUjplyxNNyKXrH3utn2JfOJaslITzXuqxvsRINqDhFTnH428ZcTT-yhmIyo3quKp28" },
    { name: "Luna City", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf4Ts3p82koVHx5x5wInhFQfcT69XIq2Jron6icQbAQhhokJEG69x5aZktcx3hbnmU5RUN81dKSSwJ6PuttxmSVux01c8QaJqSyU-AvS5-IX1iYIRhxHXUgNe9CO0IlxNIdw2Sz1DL-qyXuPaNMcdyzHhKdnVDOZP6XGMB05PQoCctu3YG1_rANRgrTf5jh2lpKG0KcFA3mUM6MIeyJ-9P-v3MJQLd3DwaHReEjN7bQNGd-pqmdZi64WCeDJ1EmH7_pNgRaVZzIIQ" },
    { name: "Marco S.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlJLUMFIhfu0zVsPCf0ERiY5WjPrvLmPqdLT7UgDV5JLzHowXKjicFIEGynUDjeAiGblxJiMCEfRzE4K6t17hZ_rzMq2ItcSJJoGV_EHJEDExpSvSRW7jpxWp3Jlzzscfi00k05HH95BCitBMesiFEX9Bo_fWEcmPeo4gi9A6V0883n3g5bfxunza40RqzPqsz2z73N1ABsNbZjabz6KeE-oNQ6zgZO9JRe37pm5Scy1O_-15Twcb7kXmYPnEZ4_1mHLIZPFPKMIM" },
    { name: "K-Soul", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe6vGaW6_KOBVTkpxH-POCDvufjly5ITR7Ob7Mk4BsjHXk8NbTO2-vdQQftAwIqxY_N93myyoTaSJo7yJ5KnRb2A91asim1wSl3Oja0NgVeviOPhQEcKjRTMOap3SMjYgji_xen2S4WM9YYOHO8xRKdoHXlCxHwU842m7fGQmsxVB66ENKYlMlOMlUUOgLbPrJEgJjv5drGiqkgCPEU3lG-7q85VpRz0JSGWD2ZgRSa4FoE6zIcXfsy5UPfg8f0GjZ9MUn8rJ6nh8" },
];

export function EventLineup() {
    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">The Lineup</h2>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">5 Artists</span>
            </div>
            <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-2">
                {artists.map((artist, index) => (
                    <div key={index} className="flex-shrink-0 text-center w-20">
                        <div className={`relative w-20 h-20 rounded-full mb-2 p-1 border-2 ${index === 0 ? 'border-primary/30' : 'border-transparent'}`}>
                            <img
                                alt={artist.name}
                                className="w-full h-full object-cover rounded-full"
                                src={artist.image}
                            />
                        </div>
                        <p className="text-sm font-medium leading-tight">{artist.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
