import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Minimalist Ceramic Mug',
    price: 18.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    availableColors: ['White', 'Matte Black', 'Sage Green'],
    availableSizes: ['Standard'],
    description:
      'Artisanal stoneware mug with a smooth matte glaze and ergonomic handle. Engineered for daily coffee rituals with balanced thermal retention.',
  },
  {
    id: 'p2',
    name: 'Linen Throw Blanket',
    price: 65.0,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    availableColors: ['Beige', 'Charcoal', 'Navy'],
    availableSizes: ['Throw', 'Queen'],
    description:
      'Crafted from 100% French flax linen, pre-washed for effortless softness. Naturally breathable and temperature-regulating throughout all seasons.',
  },
  {
    id: 'p3',
    name: 'Leather Cardholder',
    price: 35.0,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    availableColors: ['Tan', 'Black', 'Burgundy'],
    availableSizes: ['One Size'],
    description:
      'Ultra-slim full-grain vegetable-tanned leather wallet featuring 4 card slots and a central cash pocket with hand-burnished edges.',
  },
  {
    id: 'p4',
    name: 'Noise-Cancelling Headphones',
    price: 249.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    availableColors: ['Silver', 'Black'],
    availableSizes: ['One Size'],
    description:
      'Engineered with hybrid active noise cancellation, custom 40mm dynamic drivers, and memory-foam ear cushions providing up to 30 hours of playtime.',
  },
  {
    id: 'p5',
    name: 'Organic Cotton T-Shirt',
    price: 28.0,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    availableColors: ['White', 'Black', 'Heather Grey', 'Olive'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    description:
      'Tailored from 100% GOTS-certified heavyweight organic cotton. Ribbed collar and reinforced seams provide long-lasting shape retention.',
  },
  {
    id: 'p6',
    name: 'Aromatherapy Diffuser',
    price: 42.0,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600&auto=format&fit=crop',
    rating: 4.3,
    availableColors: ['Light Wood', 'Dark Wood'],
    availableSizes: ['Standard'],
    description:
      'Ultrasonic mist humidifier and essential oil diffuser featuring whisper-quiet operation, ambient warm LED illumination, and auto-shutoff safety.',
  },
  {
    id: 'p7',
    name: 'Stainless Steel Water Bottle',
    price: 22.5,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    availableColors: ['Brushed Steel', 'Matte Black', 'Ocean Blue'],
    availableSizes: ['16oz', '24oz', '32oz'],
    description:
      'Double-walled vacuum insulated 18/8 food-grade stainless steel bottle. Keeps drinks cold for 24 hours or steaming hot for 12 hours.',
  },
  {
    id: 'p8',
    name: 'Classic Aviator Sunglasses',
    price: 85.0,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    availableColors: ['Gold/Green', 'Silver/Grey', 'Black/Black'],
    availableSizes: ['One Size'],
    description:
      'Timeless teardrop aviator frame built from corrosion-resistant alloy with scratch-resistant polarized lenses providing 100% UV400 protection.',
  },
];

export const CATEGORIES = ['All', 'Home', 'Accessories', 'Electronics', 'Apparel'] as const;
