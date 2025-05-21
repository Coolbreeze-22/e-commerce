import "./RelatedProducts.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { RootState } from "../../states/redux/store";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  addItemToCart,
  addItemToWishlist,
  computeDiscountPercent,
  computeRating,
} from "../utils/utilityFunctions";
import { ProductType } from "../../states/redux/reducerTypes";
import Navbar from "../Navbar/Navbar";
import { FiShoppingCart } from "react-icons/fi";
import { useFetchProducts } from "../../controller/productController";

const RelatedProducts = () => {
  const { products } = useSelector((state: RootState) => state.productReducer);
  const dispatch = useDispatch();
  useFetchProducts(products.length, dispatch);

  const query = new URLSearchParams(useLocation().search);

  const categoryParam = query.get("category") || query.get("sub-category");

  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    if (categoryParam === query.get("category")) {
      return product.category === categoryParam;
    } else {
      return product.subCategory === categoryParam;
    }
  });

  const handleWishlist = (product: ProductType) => {
    addItemToWishlist({ product, dispatch });
  };

  const viewProduct = (product: ProductType) => {
    navigate(`/product-details/${product.id}`);
  };
  const checkRating = (rating: Array<string>, label: string) => {
    const returnData = computeRating(rating, label);
    return returnData;
  };
  const checkDiscountPercent = (discountedPrice: number, price: number) => {
    const discountPercent = computeDiscountPercent(discountedPrice, price);
    return discountPercent;
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
    <Navbar>
      <main className="group-container">
        <section>
          <div className="group-path">
            <span className="group-path1" onClick={() => navigate("/")}>
              Home
            </span>
            /<span className="group-path2">{categoryParam}</span>
          </div>
        </section>

        <section className="group-grid">
          {filteredProducts.map((product, index) => (
            <div key={index} onClick={() => viewProduct(product)}>
              <section className="group-image-sect">
                {product.discountedPrice && (
                  <div className="group-discount">
                    {checkDiscountPercent(
                      product.discountedPrice,
                      product.price
                    )}
                    %
                  </div>
                )}
                <div
                  className="group-heart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                >
                  <FaRegHeart className="group-icon" />
                </div>
                <div className="group-eye">
                  <MdOutlineRemoveRedEye className="group-icon" />
                </div>
                <div className="group-image-wrapper">
                  <img
                    loading="lazy"
                    src={product.photo[0]}
                    alt="img"
                    className="group-image"
                  />
                </div>
                <div
                  className="group-add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <FiShoppingCart className="group-add-icon" />
                  <p>Add To Cart</p>
                </div>
              </section>
              <section>
                <p className="group-item-name">{product.name}</p>
                {product.discountedPrice && (
                  <span className="group-new-price">
                    ₦{product.discountedPrice}{" "}
                  </span>
                )}
                <span
                  className={
                    product.discountedPrice
                      ? "group-old-price"
                      : "group-new-price"
                  }
                >
                  ₦{product.price}
                </span>
                <div className="group-star-rating-wrapper">
                  <Rating
                    name="read-only"
                    value={checkRating(product.rating, "star")}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  <span className="group-rating">
                    ({checkRating(product.rating, "percent")})
                  </span>
                </div>
              </section>
            </div>
          ))}
        </section>
      </main>
    </Navbar>
  );
};
export default RelatedProducts;
