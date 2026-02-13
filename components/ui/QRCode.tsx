'use client';

import React from 'react';

interface QRCodeProps {
    /** The string value to encode in the QR code */
    value: string;
    /** Size in pixels (width and height). Defaults to 256. */
    size?: number;
    /** Optional className for the img element */
    className?: string;
    /** Optional alt text. Defaults to "QR Code" */
    alt?: string;
}

/**
 * Renders a QR code image using the free qrserver.com API.
 * No dependencies required — just an <img> tag pointing to the API.
 */
export function QRCode({ value, size = 256, className, alt = 'QR Code' }: QRCodeProps) {
    const encodedValue = encodeURIComponent(value);
    const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedValue}&margin=8`;

    return (
        <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={className}
            loading="eager"
        />
    );
}
