import "./WishlistProducts.css";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  computeDiscountPercent,
  computeRating,
} from "../../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
import { removeFromWishlist } from "../../../controller/cartController";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

type WishlistProductsProps = {
  products: Array<ProductType>;
  isWishlist: boolean;
};
const WishlistProducts = ({ products, isWishlist }: WishlistProductsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkRating = (rating: Array<string>, label: string) => {
    const returnData = computeRating(rating, label);
    return returnData;
  };
  const checkDiscountPercent = (discountedPrice: number, price: number) => {
    const returnData = computeDiscountPercent(discountedPrice, price);
    return returnData;
  };

  const viewProduct = (product: ProductType) => {
    navigate(`/product-details/${product.id}`);
  };

  const handleRemoveFromWishlist = (id: string, label: string) => {
    removeFromWishlist({ id, label, dispatch });
  };

  const handleAddToCart = (item: ProductType) => {
    addItemToCart({
      item,
      size: item.size,
      quantity: 1,
      dispatch,
    });
    if (isWishlist) {
      handleRemoveFromWishlist(item.id, "no notification");
    }
  };
  return (
    <main className="wishlist-grid">
      {(isWishlist ? products : products.slice(0, 4)).map((product, index) => (
        <div key={index} onClick={() => viewProduct(product)}>
          <section className="wishlist-image-sect">
            {product.discountedPrice && (
              <div className="wishlist-discount">
                {checkDiscountPercent(product.discountedPrice, product.price)}%
              </div>
            )}
            {isWishlist ? (
              <div
                className="wishlist-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromWishlist(product.id, "");
                }}
              >
                <RiDeleteBin5Line className="wishlist-icon" />
              </div>
            ) : (
              <div className="wishlist-eye">
                <MdOutlineRemoveRedEye className="wishlist-icon" />
              </div>
            )}

            <div className="wishlist-image-wrapper">
              <img
                loading="lazy"
                src={product.photo[0]}
                alt="img"
                className="wishlist-image"
              />
            </div>
            <div
              className="wishlist-add-to-cart"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              <FiShoppingCart className="wishlist-add-icon" />
              <p>Add To Cart</p>
            </div>
          </section>
          <section>
            <p className="wishlist-item-name">{product.name}</p>
            {product.discountedPrice && (
              <span className="wishlist-new-price">
                ₦{product.discountedPrice}{" "}
              </span>
            )}
            <span
              className={
                product.discountedPrice
                  ? "wishlist-old-price"
                  : "wishlist-new-price"
              }
            >
              ₦{product.price}
            </span>
            <div className="wishlist-star-rating-wrapper">
              <Rating
                name="read-only"
                value={checkRating(product.rating, "star")}
                readOnly
                precision={0.5}
                size="small"
              />
              <span className="wishlist-rating">
                ({checkRating(product.rating, "percent")})
              </span>
            </div>
          </section>
        </div>
      ))}
    </main>
  );
};

export default WishlistProducts;
