import React from 'react';

const BrandBanner = ({ style }) => {
    return (
        <div style={{
            backgroundColor: '#161616',
            padding: '50px 10%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '40px',
            borderTop: '1px solid #222',
            borderBottom: '1px solid #222',
            ...style
        }}>
            {/* Rado */}
            <div style={{ color: '#666', fontFamily: 'Impact, sans-serif', fontSize: '38px', letterSpacing: '3px', textAlign: 'center', flex: 1, minWidth: '150px' }}>
                RADO
                <div style={{ fontSize: '11px', letterSpacing: '3px', fontWeight: 'normal', fontFamily: 'Arial, sans-serif', marginTop: '-5px', textTransform: 'capitalize' }}>Switzerland</div>
            </div>

            {/* Swatch */}
            <div style={{ color: '#666', fontFamily: 'Arial, sans-serif', fontSize: '36px', letterSpacing: '-1.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: '150px' }}>
                swatch
                <span style={{
                    fontSize: '20px',
                    marginLeft: '8px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#666',
                    color: '#161616',
                    paddingBottom: '2px'
                }}>+</span>
            </div>

            {/* Omega */}
            <div style={{ color: '#666', textAlign: 'center', fontFamily: 'Arial, sans-serif', flex: 1, minWidth: '150px' }}>
                <div style={{ fontSize: '38px', marginBottom: '-5px' }}>Ω</div>
                <div style={{ fontSize: '24px', letterSpacing: '2px', fontWeight: 'bold' }}>OMEGA</div>
            </div>

            {/* Zenith */}
            <div style={{ color: '#666', textAlign: 'center', fontFamily: 'Arial, sans-serif', flex: 1, minWidth: '150px' }}>
                <div style={{ fontSize: '18px', marginBottom: '2px' }}>☆</div>
                <div style={{ fontSize: '26px', letterSpacing: '5px', fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>ZENITH</div>
                <div style={{ fontSize: '8px', letterSpacing: '3px', marginTop: '5px', opacity: 0.8 }}>SWISS WATCH MANUFACTURE<br />SINCE 1865</div>
            </div>
        </div>
    );
};

export default BrandBanner;
