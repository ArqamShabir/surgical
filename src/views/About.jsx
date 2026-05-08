import React from 'react';
import PageBanner from '../components/PageBanner';

const About = () => {
  return (
    <>
      <PageBanner title="About Us" />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container about-content">
          <div className="section-header">
            <h2 style={{ color: 'var(--color-primary-teal)' }}>Our Legacy of Quality</h2>
          </div>
          <p>
            For over two decades, CoinSurgical has been at the forefront of medical instrumentation design and manufacturing. We understand that in the operating room, there is no margin for error. That is why every instrument we produce undergoes rigorous quality control and is crafted from the finest German stainless steel, titanium, and tungsten carbide.
          </p>
          <p>
            Our commitment goes beyond simply supplying tools. We partner with healthcare professionals to continuously innovate and refine our designs, ensuring optimal ergonomics, durability, and clinical efficacy.
          </p>

          <div className="stats-grid">
            <div>
              <div className="stat-num">25+</div>
              <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>Years of Excellence</div>
            </div>
            <div>
              <div className="stat-num">10k+</div>
              <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>Instruments in Catalog</div>
            </div>
            <div>
              <div className="stat-num">50+</div>
              <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>Countries Served</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
