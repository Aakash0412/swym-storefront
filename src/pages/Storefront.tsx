import React from 'react';
import { PRODUCTS } from '../data/products';

export const Storefront: React.FC = () => {

  return (
    <section>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Explore Our Collection
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Discover minimalist, sustainably-crafted lifestyle essentials.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              padding: '1rem',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.05em',
              }}
            >
              {product.category}
            </span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0.25rem 0' }}>
              {product.name}
            </h3>
            <p style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
