import Image from 'next/image';

const marqueeImages = [
  { src: '/rhinoplasty-82pcs-set.jpeg', alt: 'Rhinoplasty 82 PCS Set Gold' },
];

const repeatedGroups = Array.from({ length: 2 }, (_, index) => index);

const BrandMarquee = () => {
  return (
    <section className="brand-marquee-section" aria-label="Galeria destacada de CoinSurgical">
      <div className="brand-marquee-header">
        <Image className="brand-marquee-logo" src="/logo.png" alt="CoinSurgical" width={56} height={56} />
        <div className="brand-marquee-text">
          <h2>#COINSURGICAL | Precision en la que puede confiar</h2>
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
