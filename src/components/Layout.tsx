import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            <span className={styles.footerBrand}>SWYM Studio</span> — Premium E-Commerce & Wishlist Architecture.
          </div>
          <div className={styles.footerLinks}>
            <span>Frontend-Only LocalStorage Persistence</span>
            <span>•</span>
            <span>GitHub Pages Deployed</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
