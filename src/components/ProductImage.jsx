'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export const getImageSrc = (image) => {
  if (typeof image === 'string') return image;
  return image?.src || '';
};

export const getImageAlt = (image, fallback) => {
  if (typeof image === 'string') return fallback;
  return image?.alt || fallback;
};

const ProductImage = ({
  image,
  alt,
  altFallback = '',
  className = '',
  imageClassName = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
}) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = getImageSrc(image);
  const label = alt || getImageAlt(image, altFallback);
  const isVisible = src && !failed;

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  return (
    <span className={`image-shell ${className} ${isVisible && loaded ? 'is-loaded' : 'is-loading'} ${isVisible ? '' : 'is-empty'}`}>
      {isVisible ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          quality={68}
          {...(priority ? {} : { loading: 'lazy' })}
          className={imageClassName}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="image-missing" aria-label={label}>
          Imagen no disponible
        </span>
      )}
    </span>
  );
};

export default ProductImage;
