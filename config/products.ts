export const PRODUCTS_PRICES = {
  // 4:58:0
  material: {
    silicone: 0,
    polycarbonate: 5_00, // this is a way to formatting javascript numbers. This number will help me to store long number and enhances the readability. This price system is supported by raw JS.
  },
  finish: {
    smooth: 0,
    textured: 3_00,
  },
} as const;

export const BASE_PRICE = 14_00;
