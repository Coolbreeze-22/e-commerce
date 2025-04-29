import "./SimilarProducts.css";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../states/redux/reducerTypes";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { addItemToCart, addItemToWishlist } from "../../utils/utilityFunctions";
import { FiShoppingCart } from "react-icons/fi";

const SimilarProducts = ({ product }: { product: ProductType }) => {
  const allProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const similarProducts = allProducts.filter(
    (item) => item.id !== product.id && item.category === product.category
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWishlist = (product: ProductType) => {
    addItemToWishlist({ product, dispatch });
  };

  const viewProduct = (product: ProductType) => {
    navigate(`/product-details/${product.id}`);
  };

  const checkRating = (rating: Array<string>, label: string) => {
    const sum = rating.reduce((acc, value) => acc + Number(value), 0);
    const result = sum / rating.length;

    const ratingStar = Number(result.toFixed(1));
    const ratingPercent = Math.round(result * 20);
    if (label === "percent") {
      return ratingPercent;
    } else {
      return ratingStar;
    }
  };

  const handleAddToCart = (item: ProductType) => {
    addItemToCart({
      item,
      size: item.size,
      quantity: 1,
      dispatch,
    });
  };

  return (
    <main className="similar-container">
      {!similarProducts.length ? null : (
        <>
          <section className="similar-info">
            <span className="similar-red"></span>
            <span className="similar-similar">Related Items</span>
          </section>
          <section className="similar-wrapper">
            {similarProducts.map((similarProduct, index) => (
              <div key={index} onClick={() => viewProduct(similarProduct)}>
                <section className="similar-image-sect">
                  <div
                    className="similar-heart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlist(product);
                    }}
                  >
                    <FaRegHeart className="similar-icon" />
                  </div>
                  <div className="similar-eye">
                    <MdOutlineRemoveRedEye className="similar-icon" />
                  </div>
                  <div>
                    <img
                      loading="lazy"
                      src={similarProduct.photo[0]}
                      alt="loading"
                      className="similar-image"
                    />
                  </div>
                  <div
                    className="similar-add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <FiShoppingCart className="similar-add-icon" />
                    <p>Add To Cart</p>
                  </div>
                </section>
                <section>
                  <div>
                    <p className="similar-item-name">{similarProduct.name}</p>
                    {similarProduct.discountedPrice && (
                      <span className="similar-new-price">
                        ${similarProduct.discountedPrice}
                      </span>
                    )}
                    <span
                      className={
                        similarProduct.discountedPrice
                          ? "similar-old-price"
                          : "best-new-price"
                      }
                    >
                      ${similarProduct.price}
                    </span>
                    <div className="similar-star-rating-wrapper">
                      <Rating
                        name="read-only"
                        value={checkRating(similarProduct.rating, "star")}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                      <span className="similar-rating">
                        ({checkRating(similarProduct.rating, "percent")})
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  );
};

export default SimilarProducts;
