import React from 'react';

const brands = [
    "Rolex", "Cartier", "Omega", "Hublot", "Breitling",
    "Panerai", "TAG Heuer", "IWC Schaffhausen", "Chopard",
    "Zenith", "Tudor", "Longines", "Rado", "Baume & Mercier", "Grand Seiko"
];

const BrandCarousel = () => {
    return (
        <div className="marquee-container">
            {/* Render twice for seamless continuous scrolling */}
            <div className="marquee-content">
                {brands.map((brand, index) => (
                    <div key={`brand-1-${index}`} className="brand-item">
                        <span style={{ fontSize: '14px', marginRight: '15px', color: 'var(--secondary)' }}>✦</span>
                        {brand}
                    </div>
                ))}
            </div>
            <div className="marquee-content">
                {brands.map((brand, index) => (
                    <div key={`brand-2-${index}`} className="brand-item">
                        <span style={{ fontSize: '14px', marginRight: '15px', color: 'var(--secondary)' }}>✦</span>
                        {brand}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandCarousel;
