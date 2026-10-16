import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, Heart, Plus, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { CreateWishlistModal } from './CreateWishlistModal';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { wishlists } = useWishlist();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Navigation drawer"
      >
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Navigation</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.navSection} aria-label="Main menu">
          <Link
            to="/"
            className={`${styles.navLink} ${
              location.pathname === '/' ? styles.navLinkActive : ''
            }`}
            onClick={onClose}
          >
            <Store size={18} />
            <span>Storefront</span>
          </Link>

          <Link
            to="/wishlists"
            className={`${styles.navLink} ${
              location.pathname === '/wishlists' ? styles.navLinkActive : ''
            }`}
            onClick={onClose}
          >
            <Heart size={18} />
            <span>Manage Wishlists</span>
          </Link>
        </nav>

        <div className={styles.wishlistsSection}>
          <div className={styles.wishlistsHeader}>
            <span className={styles.sectionTitle}>Your Wishlists</span>
            <button
              type="button"
              className={styles.createBtn}
              onClick={() => setIsCreateModalOpen(true)}
              title="Create new wishlist"
              aria-label="Create new wishlist"
            >
              <Plus size={16} />
            </button>
          </div>

          {wishlists.length === 0 ? (
            <p className={styles.emptyState}>
              No wishlists yet. Click <strong>+</strong> to start curating items.
            </p>
          ) : (
            <ul className={styles.wishlistList}>
              {wishlists.map((w) => (
                <li key={w.id}>
                  <Link
                    to={`/wishlists#${w.id}`}
                    className={styles.wishlistItem}
                    onClick={onClose}
                  >
                    <span className={styles.wishlistName}>{w.name}</span>
                    <span className={styles.itemCountBadge}>
                      {w.productIds.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.sidebarFooter}>
          <span>SWYM CX Storefront v2.0</span>
        </div>
      </aside>

      <CreateWishlistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};
