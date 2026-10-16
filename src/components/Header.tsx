import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Heart, Scale } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import styles from './Header.module.css';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { wishlists } = useWishlist();
  const { comparedIds, openCompareModal } = useComparison();

  const totalSavedItems = wishlists.reduce((acc, w) => acc + w.productIds.length, 0);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <Link to="/" className={styles.brand}>
          <span className={styles.brandName}>SWYM</span>
          <span className={styles.brandBadge}>Studio</span>
        </Link>

        <nav className={styles.nav} aria-label="Main Navigation">
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
          >
            Catalog
          </Link>
          <Link
            to="/wishlists"
            className={`${styles.navLink} ${
              location.pathname === '/wishlists' ? styles.navLinkActive : ''
            }`}
          >
            Wishlists
          </Link>
        </nav>
      </div>

      <div className={styles.actions}>
        {comparedIds.length > 0 && (
          <button
            type="button"
            className={styles.actionBtn}
            onClick={openCompareModal}
            title="View Product Comparison"
            aria-label={`Compare ${comparedIds.length} products`}
          >
            <Scale size={18} />
            <span className={styles.btnLabel}>Compare</span>
            <span className={`${styles.badge} ${styles.compareBadge}`}>{comparedIds.length}</span>
          </button>
        )}

        <Link
          to="/wishlists"
          className={styles.actionBtn}
          title="Manage Wishlists"
          aria-label={`Wishlists with ${totalSavedItems} saved items`}
        >
          <Heart size={18} />
          <span className={styles.btnLabel}>Wishlists</span>
          <span className={styles.badge}>{wishlists.length}</span>
        </Link>
      </div>
    </header>
  );
};
