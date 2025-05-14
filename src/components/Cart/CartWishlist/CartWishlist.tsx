import "./CartWishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { removeFromWishlist } from "../../../controller/cartController";
import { MdCancel } from "react-icons/md";
import { useStateContext } from "../../../context/context";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton/CustomButton";
import { FiShoppingCart } from "react-icons/fi";
import { addItemToCart } from "../../utils/utilityFunctions";
import { ProductType } from "../../../states/redux/reducerTypes";

const CartWishlist = () => {
  type UpdatedItemProps = {
    id: string;
    size: string;
    quantity: number;
  };
  const initialState = {
    id: "",
    size: "M",
    quantity: 1,
  };

  const { wishlist } = useSelector((state: RootState) => state.cartReducer);
  const { isWishlist, setIsWishlist } = useStateContext();
  const [updatedItem, setUpdatedItem] =
    useState<UpdatedItemProps>(initialState);

  const wishlistRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  function handleRemoveFromWishlist(id: string, label: string) {
    removeFromWishlist({ id, label, dispatch });
  }
  function handleAddToCart(item: ProductType) {
    const { size, quantity } = updatedItem;
    if (!updatedItem.id) {
      addItemToCart({
        item,
        size,
        quantity,
        dispatch,
      });
      handleRemoveFromWishlist(item.id, "no notification");
    } else if (updatedItem.id === item.id) {
      addItemToCart({
        item,
        size,
        quantity,
        dispatch,
      });
      handleRemoveFromWishlist(item.id, "no notification");
    }
    setUpdatedItem(initialState);
  }

  function handleSelect(
    itemId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;
    setUpdatedItem({
      size: value,
      id: itemId,
      quantity: 1,
    });
  }

  useEffect(() => {
    if (isWishlist) {
      wishlistRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isWishlist]);

  return (
    <>
      {wishlist.length ? (
        <>
          {!isWishlist ? (
            <i
              className="cart-wish-view-wishlist"
              onClick={() => setIsWishlist(true)}
            >
              View Wishlist
            </i>
          ) : (
            <main ref={wishlistRef} className="cart-wish-container">
              <header className="cart-wish-wishlist">
                <aside></aside>
                <p>Wishlist</p>
                <div>
                  <CustomButton
                    type="button"
                    text="Close"
                    onClick={() => setIsWishlist(false)}
                    className="cart-wish-btn"
                  />
                </div>
              </header>
              <header className="cart-wish-headers">
                <div className="cart-wish-headers-product">Product</div>
                <p>Price</p>
                <div className="cart-wish-size">size</div>
                <p>In Stock</p>
              </header>
              {wishlist.map((item, index) => (
                <section key={index} className="cart-wish-items-wrapper">
                  <aside>{item.name}</aside>
                  <div className="cart-wish-items">
                    <div className="cart-wish-image-area">
                      <MdCancel
                        onClick={() => handleRemoveFromWishlist(item.id, "")}
                        className="cart-wish-cancel-icon"
                      />
                      <img src={item.photo[0]} alt="loading" loading="lazy" />
                    </div>
                    <p>
                      ₦
                      {item.discountedPrice ? item.discountedPrice : item.price}
                    </p>
                    {item.size && (
                      <select
                        defaultValue={item.allSizes[2]}
                        onChange={(event) => handleSelect(item.id, event)}
                        onBlur={() => setUpdatedItem(initialState)}
                      >
                        {item.allSizes.map((itemSize, index) => (
                          <option key={index} value={itemSize}>
                            {itemSize}
                          </option>
                        ))}
                      </select>
                    )}

                    <p>
                      {item.inStock} Piece(s)
                      {!updatedItem.id || updatedItem.id === item.id ? (
                        <FiShoppingCart
                          className="cart-wish-cart-icon"
                          onClick={() => handleAddToCart(item)}
                        />
                      ) : null}
                    </p>
                  </div>
                </section>
              ))}
            </main>
          )}
        </>
      ) : null}
    </>
  );
};

export default CartWishlist;
