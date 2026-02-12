'use client';

import React, { useState } from 'react';
import { Button } from '../../ui/Button';

const filters = ["All Events", "Techno", "House", "Trance", "Beach"];

export function EventFilters() {
    const [active, setActive] = useState(0);

    return (
        <section className="mb-8 px-6">
            <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2">
                {filters.map((filter, index) => (
                    <Button
                        key={filter}
                        variant={index === active ? 'primary' : 'secondary'}
                        size="sm"
                        className="whitespace-nowrap"
                        onClick={() => setActive(index)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>
        </section>
    );
}
