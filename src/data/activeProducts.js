export const featuredSet = {
  id: '96',
  article: 'CS-RHINO-82-GOLD',
  title: 'Rhinoplasty 82 PCS Set Gold',
  category: 'Rhinoplasty Sets',
  price: 750,
  images: [
    {
      src: '/rhinoplasty-82pcs-set.jpeg',
      alt: 'Rhinoplasty 82 PCS Set Gold',
    },
  ],
  description: 'Set completo de instrumental para rinoplastia de 82 piezas con mangos de acabado dorado para flujos de trabajo profesionales en cirugia nasal. El set se ofrece como paquete listo para cotizar por $750 con envio mundial gratis durante la promocion actual de 30 dias.',
  includedPdf: '/accel-rhinoplasty-nose-set-gold.pdf',
  freeShipping: true,
  variants: [
    {
      name: 'Set Dorado de 82 Piezas',
      price: 750,
      sizes: [
        { name: 'Set Completo', code: 'CS-RHINO-82-GOLD' },
      ],
    },
  ],
  specs: [
    { label: 'Piezas', value: '82 instrumentos' },
    { label: 'Acabado del Set', value: 'Mangos con acabado dorado' },
    { label: 'Envio', value: 'Envio mundial gratis' },
    { label: 'Material', value: 'German Stainless Steel (316L)' },
    { label: 'Sterilization', value: 'Autoclavable' },
  ],
};

const activeProducts = [featuredSet];

export { activeProducts };
export default activeProducts;
