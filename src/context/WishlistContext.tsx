import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Wishlist } from '../types';
import { PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlists: Wishlist[];
  createWishlist: (name: string) => Wishlist;
  renameWishlist: (id: string, newName: string) => void;
  deleteWishlist: (id: string) => void;
  addProductToWishlist: (wishlistId: string, productId: string) => void;
  removeProductFromWishlist: (wishlistId: string, productId: string) => void;
  mergeWishlists: (
    sourceId1: string,
    sourceId2: string,
    newName: string,
    includedProductIds?: string[]
  ) => Wishlist | null;
  getWishlistsForProduct: (productId: string) => Wishlist[];
}

const STORAGE_KEY = 'ecommerce_wishlists_v1';
const LEGACY_STORAGE_KEY = 'ecommerce_wishlists';

const validProductIds = new Set(PRODUCTS.map((p) => p.id));

const sanitizeWishlist = (raw: any): Wishlist | null => {
  if (!raw || typeof raw !== 'object' || typeof raw.id !== 'string') return null;
  const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : 'Untitled Wishlist';
  const rawProductIds = Array.isArray(raw.productIds) ? raw.productIds : [];
  // Ensure IDs are strings, exist in canonical catalog, and are deduplicated
  const productIds: string[] = Array.from(
    new Set(rawProductIds.filter((id: any): id is string => typeof id === 'string' && validProductIds.has(id)))
  );
  const createdAt = typeof raw.createdAt === 'number' ? raw.createdAt : Date.now();
  const updatedAt = typeof raw.updatedAt === 'number' ? raw.updatedAt : Date.now();

  return {
    id: raw.id,
    name,
    productIds,
    createdAt,
    updatedAt,
  };
};

const loadWishlistsFromStorage = (): Wishlist[] => {
  try {
    let data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Check legacy key
      data = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    if (!data) {
      // Default initial wishlist if empty
      const initialList: Wishlist = {
        id: crypto.randomUUID(),
        name: 'My Favorites',
        productIds: ['p1', 'p3'],
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 86400000,
      };
      return [initialList];
    }
    const parsed = JSON.parse(data);
    const listArray = Array.isArray(parsed) ? parsed : parsed.wishlists;
    if (!Array.isArray(listArray)) return [];
    
    return listArray
      .map(sanitizeWishlist)
      .filter((w): w is Wishlist => w !== null);
  } catch (err) {
    console.warn('Failed to parse wishlists from storage:', err);
    return [];
  }
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>(() => loadWishlistsFromStorage());
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlists));
    } catch (err) {
      console.warn('Failed to save wishlists to localStorage:', err);
    }
  }, [wishlists]);

  const createWishlist = useCallback(
    (name: string): Wishlist => {
      const trimmed = name.trim() || 'New Wishlist';
      const newList: Wishlist = {
        id: crypto.randomUUID(),
        name: trimmed,
        productIds: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setWishlists((prev) => [...prev, newList]);
      showToast({
        type: 'success',
        message: `Wishlist "${trimmed}" created`,
      });
      return newList;
    },
    [showToast]
  );

  const renameWishlist = useCallback(
    (id: string, newName: string) => {
      const trimmed = newName.trim();
      if (!trimmed) return;
      setWishlists((prev) =>
        prev.map((w) => (w.id === id ? { ...w, name: trimmed, updatedAt: Date.now() } : w))
      );
      showToast({
        type: 'info',
        message: `Wishlist renamed to "${trimmed}"`,
      });
    },
    [showToast]
  );

  const deleteWishlist = useCallback(
    (id: string) => {
      const target = wishlists.find((w) => w.id === id);
      if (!target) return;

      const deletedList = { ...target };
      setWishlists((prev) => prev.filter((w) => w.id !== id));

      showToast({
        type: 'warning',
        message: `Deleted "${deletedList.name}"`,
        undoLabel: 'Undo',
        undoAction: () => {
          setWishlists((prev) => [...prev, deletedList]);
          showToast({
            type: 'success',
            message: `Restored "${deletedList.name}"`,
          });
        },
      });
    },
    [wishlists, showToast]
  );

  const addProductToWishlist = useCallback(
    (wishlistId: string, productId: string) => {
      if (!validProductIds.has(productId)) return;
      const product = PRODUCTS.find((p) => p.id === productId);

      setWishlists((prev) =>
        prev.map((w) => {
          if (w.id === wishlistId && !w.productIds.includes(productId)) {
            return {
              ...w,
              productIds: [...w.productIds, productId],
              updatedAt: Date.now(),
            };
          }
          return w;
        })
      );

      const targetList = wishlists.find((w) => w.id === wishlistId);
      showToast({
        type: 'success',
        message: `Added ${product ? product.name : 'product'} to "${targetList?.name || 'wishlist'}"`,
      });
    },
    [wishlists, showToast]
  );

  const removeProductFromWishlist = useCallback(
    (wishlistId: string, productId: string) => {
      const targetList = wishlists.find((w) => w.id === wishlistId);
      const product = PRODUCTS.find((p) => p.id === productId);

      setWishlists((prev) =>
        prev.map((w) => {
          if (w.id === wishlistId) {
            return {
              ...w,
              productIds: w.productIds.filter((id) => id !== productId),
              updatedAt: Date.now(),
            };
          }
          return w;
        })
      );

      showToast({
        type: 'info',
        message: `Removed ${product ? product.name : 'product'} from "${targetList?.name || 'wishlist'}"`,
        undoLabel: 'Undo',
        undoAction: () => {
          setWishlists((prev) =>
            prev.map((w) => {
              if (w.id === wishlistId && !w.productIds.includes(productId)) {
                return {
                  ...w,
                  productIds: [...w.productIds, productId],
                  updatedAt: Date.now(),
                };
              }
              return w;
            })
          );
        },
      });
    },
    [wishlists, showToast]
  );

  const mergeWishlists = useCallback(
    (
      sourceId1: string,
      sourceId2: string,
      newName: string,
      includedProductIds?: string[]
    ): Wishlist | null => {
      const list1 = wishlists.find((w) => w.id === sourceId1);
      const list2 = wishlists.find((w) => w.id === sourceId2);
      if (!list1 || !list2) return null;

      // Deduplicate products while preserving first-appearance order
      const combined = Array.from(new Set([...list1.productIds, ...list2.productIds]));
      const finalProductIds = includedProductIds
        ? combined.filter((id) => includedProductIds.includes(id))
        : combined;

      const trimmedName = newName.trim() || `${list1.name} + ${list2.name}`;
      const mergedList: Wishlist = {
        id: crypto.randomUUID(),
        name: trimmedName,
        productIds: finalProductIds,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setWishlists((prev) => [...prev, mergedList]);

      showToast({
        type: 'success',
        message: `Created merged list "${trimmedName}" (${finalProductIds.length} items)`,
        undoLabel: 'Undo',
        undoAction: () => {
          setWishlists((prev) => prev.filter((w) => w.id !== mergedList.id));
        },
      });

      return mergedList;
    },
    [wishlists, showToast]
  );

  const getWishlistsForProduct = useCallback(
    (productId: string) => {
      return wishlists.filter((w) => w.productIds.includes(productId));
    },
    [wishlists]
  );

  const contextValue = useMemo(
    () => ({
      wishlists,
      createWishlist,
      renameWishlist,
      deleteWishlist,
      addProductToWishlist,
      removeProductFromWishlist,
      mergeWishlists,
      getWishlistsForProduct,
    }),
    [
      wishlists,
      createWishlist,
      renameWishlist,
      deleteWishlist,
      addProductToWishlist,
      removeProductFromWishlist,
      mergeWishlists,
      getWishlistsForProduct,
    ]
  );

  return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
