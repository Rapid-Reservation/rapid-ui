import React, { createContext, useContext, useState, useEffect } from "react";

// Define the CartData interface
interface CartData {
  customer_id: number;
  total_price: number;
  table_id: number;
  items: string[];
}

// Define the type of the context value
interface CartContextValue {
  cartData: CartData;
  updateCartData: (newCartData: CartData) => void;
}

// Create a context with initial value of type CartContextValue
const CartContext = createContext<CartContextValue>({
  cartData: {
    customer_id: 0,
    total_price: 0,
    table_id: 0,
    items: [],
  },
  updateCartData: () => {},
});

// Create a provider component for the cart context
export const CartProvider = ({ children }: any) => {
  const emptyCart: CartData = {
    customer_id: 0,
    total_price: 0,
    table_id: 0,
    items: [],
  };
  const [cartData, setCartData] = useState(emptyCart);

  // Function to update cart data
  const updateCartData = (newCartData: CartData) => {
    setCartData(newCartData);
  };

  useEffect(() => {
    // You can add any initialization logic here, e.g., fetching cart data from server
  }, []);

  const getCartData = () => {
    console.log(cartData);
    return cartData;
  };

  // Define the context value
  const contextValue: CartContextValue = {
    cartData,
    updateCartData,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => useContext(CartContext);
