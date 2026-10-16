import React, { useState } from 'react';
import { Modal } from './Modal';
import { useWishlist } from '../context/WishlistContext';
import styles from './CreateWishlistModal.module.css';

interface CreateWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (wishlistId: string) => void;
}

export const CreateWishlistModal: React.FC<CreateWishlistModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { createWishlist, wishlists } = useWishlist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Wishlist name cannot be empty');
      return;
    }

    if (wishlists.some((w) => w.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('A wishlist with this name already exists');
      return;
    }

    const created = createWishlist(trimmed);
    setName('');
    setError('');
    onClose();
    if (onCreated) {
      onCreated(created.id);
    }
  };

  const handleClose = () => {
    setName('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Wishlist">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="new-wishlist-name" className={styles.label}>
            Wishlist Name
          </label>
          <input
            id="new-wishlist-name"
            type="text"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            placeholder="e.g. Living Room Redesign, Summer Vibes..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            autoFocus
            maxLength={60}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!name.trim()}
          >
            Create Wishlist
          </button>
        </div>
      </form>
    </Modal>
  );
};
