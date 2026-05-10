import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: "How do I know my Rolex Master Copy is authentic?",
            answer: "Every timepiece is meticulously inspected by our expert horologists before being shipped. We ensure that the weight, materials, and chronometric performance meet our uncompromising standards. Your watch will arrive with a certificate of quality."
        },
        {
            question: "What is the warranty period for my timepiece?",
            answer: "We offer an international 5-Year Guarantee on all models. This covers any manufacturing defects or deviations in timekeeping precision. It does not cover normal wear and tear, or damage caused by improper handling."
        },
        {
            question: "What is your return or exchange policy?",
            answer: "We offer a 14-day return and exchange policy. Items must be unworn, in their original condition, and accompanied by all original packaging. Custom-ordered or engraved timepieces cannot be returned."
        },
        {
            question: "How often should I service my watch?",
            answer: "To guarantee lasting precision, we recommend a complete service every 5 to 7 years. However, this interval may vary depending on your wearing habits and the environment in which the watch is used."
        },
        {
            question: "Is my watch water-resistant?",
            answer: "Yes, our timepieces feature an Oyster-style architecture ensuring waterproofness up to 100 meters (330 feet), while our diver's models offer significantly deeper resistance. Always ensure the winding crown is fully screwed down before exposure to water."
        }
    ];

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '100px' }}>

            {/* Header Content */}
            <div style={{ textAlign: "center", padding: "100px 20px 60px 20px", backgroundColor: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '15px', fontWeight: 'bold' }}>Find Answers</h2>
                <h1 style={{ fontWeight: "400", fontSize: '56px', color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>
                    Frequently Asked Questions
                </h1>
                <p style={{ marginTop: '20px', fontSize: '16px', color: 'var(--text-light)', maxWidth: '600px', margin: '20px auto 0', lineHeight: '1.8' }}>
                    Everything you need to know about our timepieces, guarantees, and services.
                </p>
            </div>

            {/* Accordion Container */}
            <div style={{ maxWidth: '800px', margin: '80px auto 0', padding: '0 20px' }}>
                <div style={{ borderTop: '1px solid var(--border-color)' }}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '30px 0',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    outline: 'none'
                                }}
                            >
                                <span style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '22px',
                                    color: activeIndex === index ? 'var(--secondary)' : 'var(--primary)',
                                    transition: 'color 0.3s'
                                }}>
                                    {faq.question}
                                </span>
                                <span style={{
                                    fontSize: '24px',
                                    color: activeIndex === index ? 'var(--secondary)' : 'var(--primary)',
                                    transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0)',
                                    transition: 'all 0.3s ease'
                                }}>
                                    +
                                </span>
                            </button>

                            <div style={{
                                maxHeight: activeIndex === index ? '500px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.4s ease-in-out',
                                opacity: activeIndex === index ? 1 : 0
                            }}>
                                <p style={{
                                    paddingBottom: '30px',
                                    color: 'var(--text-light)',
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    paddingRight: '40px'
                                }}>
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to action */}
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
                <p style={{ color: 'var(--text-light)', marginBottom: '20px', fontSize: '16px' }}>Still have questions?</p>
                <a href="/contact" style={{ display: 'inline-block' }}>
                    <button className="btn-secondary" style={{ padding: '12px 30px' }}>Contact Support</button>
                </a>
            </div>

        </div>
    );
};

export default FAQ;
