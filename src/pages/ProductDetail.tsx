import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ArrowLeft } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Product not found</h2>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1rem',
            color: 'var(--color-primary)',
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={18} /> Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.875rem',
        }}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </Link>
      <h1>{product.name}</h1>
    </div>
  );
};
