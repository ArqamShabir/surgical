export const slugify = (value) => String(value || '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const getProductSlug = (product) => `${product.id}-${slugify(product.title)}`;

export const getProductPath = (product) => `/product/${getProductSlug(product)}`;

export const findProductByParam = (products, param) => {
  const value = String(param || '');
  return products.find((product) => product.id === value || getProductSlug(product) === value);
};
