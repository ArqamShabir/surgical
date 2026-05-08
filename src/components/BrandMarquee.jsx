import Image from 'next/image';

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

const repeatedGroups = Array.from({ length: 2 }, (_, index) => index);

const BrandMarquee = () => {
  return (
    <section className="brand-marquee-section" aria-label="CoinSurgical featured gallery">
      <div className="brand-marquee-header">
        <Image className="brand-marquee-logo" src="/logo.png" alt="CoinSurgical" width={56} height={56} />
        <div className="brand-marquee-text">
          <h2>#COINSURGICAL | Precision You Can Trust</h2>
        </div>
      </div>

      <div className="brand-image-marquee">
        {repeatedGroups.map((group) => (
          <div className="brand-image-marquee__group" key={group}>
            {marqueeImages.map((image, index) => (
              <Image
                className="brand-image-slide"
                key={`${group}-${index}-${image.src}`}
                src={image.src}
                alt={image.alt}
                width={260}
                height={260}
                loading="lazy"
                quality={60}
                sizes="260px"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
