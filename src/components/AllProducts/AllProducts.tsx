import React, { useState } from "react";
import "./AllProducts.css";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { ProductType } from "../../states/redux/reducerTypes";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MyIntersectionObserver from "../utils/IntersectionObserver";
import {
  computeDiscountPercent,
  computeRating,
  addItemToWishlist,
  addItemToCart,
} from "../utils/utilityFunctions";
import Navbar from "../Navbar/Navbar";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { deleteProductByAdmin } from "../../controller/productController";

const AllProducts = () => {
  const allProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const [warning, setWarning] = useState("");

  const imageRefs = React.useRef<HTMLImageElement[]>([]);

  React.useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, allProducts.length);
    // the above is to update the imageref with the correct number of image element in a case where admin deletes a product.
    const cleanUp = MyIntersectionObserver(imageRefs);
    return cleanUp;
  }, [allProducts]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToUpdateProduct = (product: ProductType) => {
    navigate(`/admin/update-product/${product.id}`);
  };
  const handleDelete = (id: string) => {
    deleteProductByAdmin(id, dispatch);
    setWarning("");
  };
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
    const returnData = computeDiscountPercent(discountedPrice, price);
    return returnData;
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
      <main className="all-container">
        <section className="all-info">
          <div className="all-path">
            <span className="all-path1" onClick={() => navigate("/")}>
              Home
            </span>
            /<span className="all-path2">Products</span>
          </div>
          <header className="all-header">Available Products</header>
        </section>

        <section className="all-grid">
          {allProducts.map((product, index) => (
            <div key={index} onClick={() => viewProduct(product)}>
              <section className="all-image-sect">
                {product.discountedPrice && (
                  <div className="all-discount">
                    {checkDiscountPercent(
                      product.discountedPrice,
                      product.price
                    )}
                    %
                  </div>
                )}
                <div
                  className="all-heart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                >
                  <FaRegHeart className="all-icon" />
                </div>
                <div className="all-eye">
                  <MdOutlineRemoveRedEye className="all-icon" />
                </div>
                <div
                  className="all-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToUpdateProduct(product);
                  }}
                >
                  <MdOutlineEdit className="all-icon" />
                </div>
                <div className="all-delete">
                  <MdDeleteOutline className="all-icon" />
                </div>
                <div
                  className="all-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setWarning(product.id);
                  }}
                >
                  <MdDeleteOutline className="all-icon" />
                </div>
                {warning === product.id && (
                  <div className="all-warning">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setWarning("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="all-image-wrapper">
                  <img
                    loading="lazy"
                    ref={(element) => {
                      imageRefs.current[index] = element as HTMLImageElement;
                    }}
                    data-src={product.photo[0]}
                    alt="img"
                    className="all-image"
                  />
                </div>
                <div
                  className="all-add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <FiShoppingCart className="all-add-icon" />
                  <p>Add To Cart</p>
                </div>
              </section>
              <section>
                <p className="all-item-name">{product.name}</p>
                {product.discountedPrice && (
                  <span className="all-new-price">
                    ₦{product.discountedPrice}{" "}
                  </span>
                )}
                <span
                  className={
                    product.discountedPrice ? "all-old-price" : "all-new-price"
                  }
                >
                  ₦{product.price}
                </span>
                <div className="all-star-rating-wrapper">
                  <Rating
                    name="read-only"
                    value={checkRating(product.rating, "star")}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  <span className="all-rating">
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
export default AllProducts;
