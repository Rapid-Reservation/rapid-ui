// CartModal.js
import React, { useState } from "react";
import Image from "next/image";
import { Popover, Typography } from "@mui/material";
import { useCart } from "@/context/cartContext";

const CartModal = ({ cart }: any) => {
  const { cartData, updateCartData } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* Cart Button */}
      <div onClick={openPopover}>
        <Image
          className="rounded-full"
          src="/checkout-cart-icon-16.png"
          width={40}
          height={40}
          alt="View your checkout cart"
        />
      </div>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div className="popover-content">
          {/* Render cart data */}
          <Typography variant="h6">Current Cart:</Typography>
          <Typography variant="body1">Items:</Typography>
          <ul>
            {cartData.items.map(
              (
                item:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
          <Typography variant="body1">
            Total Price: ${cartData.total_price.toFixed(2)}
          </Typography>
          <Typography variant="body1">Table ID: {cartData.table_id}</Typography>

          <button onClick={closePopover}>Close</button>
        </div>
      </Popover>
    </>
  );
};

export default CartModal;
