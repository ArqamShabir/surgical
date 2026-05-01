import React from 'react';

const marqueeImages = [
  { src: 'https://cdn.coinsurgical.shop/1.jpeg', alt: 'CoinSurgical surgical instrument detail' },
  { src: 'https://cdn.coinsurgical.shop/2.jpeg', alt: 'CoinSurgical forceps detail' },
  { src: 'https://cdn.coinsurgical.shop/3.jpeg', alt: 'CoinSurgical retractor detail' },
  { src: 'https://cdn.coinsurgical.shop/4.jpeg', alt: 'CoinSurgical precision instrument' },
  { src: 'https://cdn.coinsurgical.shop/5.jpeg', alt: 'CoinSurgical stainless steel instrument' },
  { src: 'https://cdn.coinsurgical.shop/6.jpeg', alt: 'CoinSurgical stainless steel instrument' },
  { src: 'https://cdn.coinsurgical.shop/7.jpeg', alt: 'CoinSurgical stainless steel instrument' },
  { src: 'https://cdn.coinsurgical.shop/8.jpeg', alt: 'CoinSurgical stainless steel instrument' },
  { src: 'https://cdn.coinsurgical.shop/9.jpeg', alt: 'CoinSurgical stainless steel instrument' },
  { src: 'https://cdn.coinsurgical.shop/10.jpeg', alt: 'CoinSurgical stainless steel instrument' },
  { src: 'https://cdn.coinsurgical.shop/a1.jpeg', alt: 'CoinSurgical stainless steel instrument' },
  { src: 'https://cdn.coinsurgical.shop/a2.jpeg', alt: 'CoinSurgical stainless steel instrument' },
{ src: 'https://cdn.coinsurgical.shop/a3.jpeg', alt: 'CoinSurgical stainless steel instrument' }

];

const repeatedGroups = Array.from({ length: 4 }, (_, index) => index);

const BrandMarquee = () => {
  return (
    <section className="brand-marquee-section" aria-label="CoinSurgical featured gallery">
      <div className="brand-marquee-header">
        <img className="brand-marquee-logo" src="/logo.png" alt="CoinSurgical" />
        <div className="brand-marquee-text">
          <h2>#COINSURGICAL | Precision You Can Trust</h2>
        </div>
      </div>

      <div className="brand-image-marquee">
        {repeatedGroups.map((group) => (
          <div className="brand-image-marquee__group" key={group}>
            {marqueeImages.map((image, index) => (
              <img
                className="brand-image-slide"
                key={`${group}-${index}-${image.src}`}
                src={image.src}
                alt={image.alt}
                loading={group === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={group === 0 && index < 3 ? 'high' : 'auto'}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
