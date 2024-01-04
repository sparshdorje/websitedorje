import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useCart = create()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const { items } = state;

          // Check if the product is already in the cart
          const existingProductIndex = items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingProductIndex !== -1) {
            // If the product is already in the cart, increase its quantity
            const updatedItems = [...items];
            updatedItems[existingProductIndex].product.quantity +=
              product.quantity;

            return { items: updatedItems };
          } else {
            // If the product is not in the cart, add it with a quantity of 1
            return {
              items: [...items, { product: { ...product } }],
            };
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      increaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  product: {
                    ...item.product,
                    quantity: item.product.quantity + 1,
                  },
                }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.product.quantity > 1
              ? {
                  ...item,
                  product: {
                    ...item.product,
                    quantity: item.product.quantity - 1,
                  },
                }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
