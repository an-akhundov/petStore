import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const newItems = [...state.items];
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const newItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      newItems[existingCartItemIndex] = newItem;
    } else {
      newItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: newItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const newItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      newItems.splice(existingCartItemIndex, 1);
    } else {
      const newItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      newItems[existingCartItemIndex] = newItem;
    }

    return { ...state, items: newItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearCart() {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
