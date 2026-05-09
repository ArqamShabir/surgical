import Image from 'next/image';

const marqueeImages = [
  { src: 'https://cdn.coinsurgical.shop/1.jpeg', alt: 'Detalle de instrumental quirúrgico CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/2.jpeg', alt: 'Detalle de pinzas CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/3.jpeg', alt: 'Detalle de separador CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/4.jpeg', alt: 'Instrumento de precisión CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/5.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/6.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/7.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/8.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/9.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/10.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/a1.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
  { src: 'https://cdn.coinsurgical.shop/a2.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' },
{ src: 'https://cdn.coinsurgical.shop/a3.jpeg', alt: 'Instrumento de acero inoxidable CoinSurgical' }

];

const repeatedGroups = Array.from({ length: 2 }, (_, index) => index);

const BrandMarquee = () => {
  return (
    <section className="brand-marquee-section" aria-label="Galería destacada de CoinSurgical">
      <div className="brand-marquee-header">
        <Image className="brand-marquee-logo" src="/logo.png" alt="CoinSurgical" width={56} height={56} />
        <div className="brand-marquee-text">
          <h2>#COINSURGICAL | Precisión en la que puede confiar</h2>
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
