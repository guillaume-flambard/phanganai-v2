import React from 'react';
import { Button } from '../../ui/Button';

const filters = ["All Events", "Techno", "House", "Trance", "Beach"];

export function EventFilters() {
    return (
        <section className="mb-8 px-6">
            <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2">
                {filters.map((filter, index) => (
                    <Button
                        key={filter}
                        variant={index === 0 ? 'primary' : 'secondary'}
                        size="sm"
                        className="whitespace-nowrap"
                    >
                        {filter}
                    </Button>
                ))}
            </div>
        </section>
    );
}
