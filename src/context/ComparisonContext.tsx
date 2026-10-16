import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

interface ComparisonContextType {
  comparedIds: string[];
  comparedProducts: Product[];
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  openCompareModal: () => void;
  closeCompareModal: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARE = 4;

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const { showToast } = useToast();

  const toggleCompare = useCallback(
    (productId: string) => {
      setComparedIds((prev) => {
        if (prev.includes(productId)) {
          const next = prev.filter((id) => id !== productId);
          showToast({
            type: 'info',
            message: 'Removed from comparison',
          });
          return next;
        }

        if (prev.length >= MAX_COMPARE) {
          showToast({
            type: 'warning',
            message: `You can compare up to ${MAX_COMPARE} products at a time`,
          });
          return prev;
        }

        const product = PRODUCTS.find((p) => p.id === productId);
        showToast({
          type: 'success',
          message: `Added ${product ? product.name : 'product'} to comparison`,
        });
        return [...prev, productId];
      });
    },
    [showToast]
  );

  const removeFromCompare = useCallback(
    (productId: string) => {
      setComparedIds((prev) => prev.filter((id) => id !== productId));
    },
    []
  );

  const clearCompare = useCallback(() => {
    setComparedIds([]);
    setIsCompareModalOpen(false);
  }, []);

  const openCompareModal = useCallback(() => {
    if (comparedIds.length < 2) {
      showToast({
        type: 'info',
        message: 'Select at least 2 products to compare',
      });
      return;
    }
    setIsCompareModalOpen(true);
  }, [comparedIds.length, showToast]);

  const closeCompareModal = useCallback(() => {
    setIsCompareModalOpen(false);
  }, []);

  const comparedProducts = useMemo(() => {
    return comparedIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => p !== undefined);
  }, [comparedIds]);

  const value = useMemo(
    () => ({
      comparedIds,
      comparedProducts,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      isCompareModalOpen,
      openCompareModal,
      closeCompareModal,
    }),
    [
      comparedIds,
      comparedProducts,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      isCompareModalOpen,
      openCompareModal,
      closeCompareModal,
    ]
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
