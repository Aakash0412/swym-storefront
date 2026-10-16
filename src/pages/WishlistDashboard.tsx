import React from 'react';
import { useWishlist } from '../context/WishlistContext';

export const WishlistDashboard: React.FC = () => {
  const { wishlists } = useWishlist();

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Manage Wishlists
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Curate, organize, and merge your saved product lists.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {wishlists.map((w) => (
          <div
            key={w.id}
            id={w.id}
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{w.name}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              {w.productIds.length} {w.productIds.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
