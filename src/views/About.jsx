import React from 'react';
import PageBanner from '../components/PageBanner';

const About = () => {
  return (
    <>
      <PageBanner title="Nosotros" />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container about-content">
          <div className="section-header">
            <h2 style={{ color: 'var(--color-primary-teal)' }}>Nuestro Legado de Calidad</h2>
          </div>
          <p>
            Durante más de dos décadas, CoinSurgical ha estado a la vanguardia del diseño y la fabricación de instrumental médico. Entendemos que en el quirófano no hay margen de error. Por eso, cada instrumento que producimos pasa por un riguroso control de calidad y se fabrica con acero inoxidable alemán, titanio y carburo de tungsteno de la más alta calidad.
          </p>
          <p>
            Nuestro compromiso va más allá de simplemente suministrar herramientas. Trabajamos junto a profesionales de la salud para innovar y perfeccionar continuamente nuestros diseños, garantizando ergonomía, durabilidad y eficacia clínica óptimas.
          </p>

          <div className="stats-grid">
            <div>
              <div className="stat-num">25+</div>
              <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>Años de Excelencia</div>
            </div>
            <div>
              <div className="stat-num">10k+</div>
              <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>Instrumentos en Catálogo</div>
            </div>
            <div>
              <div className="stat-num">50+</div>
              <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>Países Atendidos</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
