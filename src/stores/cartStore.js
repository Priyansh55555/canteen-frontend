import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    (set, get) => ({
      cartItems: [],

      // ➕ Add item to cart
      addToCart: (item) => {
        const cart = get().cartItems;
        const existingItem = cart.find((i) => i._id === item._id);

        if (existingItem) {
          set({
            cartItems: cart.map((i) =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            cartItems: [...cart, { ...item, quantity: 1 }],
          });
        }
      },

      // ➖ Remove item completely
      removeFromCart: (_id) => {
        set({
          cartItems: get().cartItems.filter((i) => i._id !== _id),
        });
      },

      // 🔼 Increase quantity
      increaseQty: (_id) => {
        set({
          cartItems: get().cartItems.map((i) =>
            i._id === _id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      // 🔽 Decrease quantity
      decreaseQty: (_id) => {
        set({
          cartItems: get().cartItems
            .map((i) =>
              i._id === _id
                ? { ...i, quantity: Math.max(i.quantity - 1, 1) }
                : i
            ),
        });
      },

      // ❌ Clear cart
      clearCart: () => set({ cartItems: [] }),

      // 💰 Total price
      getTotalPrice: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    
        // 🧮 TOTAL ITEM COUNT (IMPORTANT)
      getTotalCount: () =>
        get().cartItems.reduce(
          (count, item) => count + item.quantity,
          0
        ),
    }
  )
);