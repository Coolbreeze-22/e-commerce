import "./SearchedProducts.css";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { ProductType } from "../../states/redux/reducerTypes";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import { deleteProductByAdmin } from "../../controller/productController";

const SearchedProducts = () => {
  const allProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const searchedQuery = query.get("name");
  const filteredProducts = allProducts.filter((item) =>
    searchedQuery
      ? item.name.toLowerCase().includes(searchedQuery.toLowerCase())
      : false
  );

  const navigateToUpdateProduct = (product: ProductType) => {
    navigate(`/admin/update-product/${product.id}`);
  };
  const handleDelete = (id: string) => {
    deleteProductByAdmin(id, dispatch);
    setWarning("")
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
      <main className="search-container">
        <section className="search-info">
          <div className="search-path">
            <span className="search-path1" onClick={() => navigate("/")}>
              Home
            </span>
            /<span className="search-path2">Search</span>
          </div>
          <header className="search-header">
            {filteredProducts.length ? (
              <div>
                Searched Products <i>{searchedQuery}</i>
              </div>
            ) : (
              <div>
                <i>{searchedQuery}</i> Not Found. Chechout Other Products
              </div>
            )}
          </header>
        </section>

        <section className="search-grid">
          {(filteredProducts.length ? filteredProducts : allProducts).map(
            (product, index) => (
              <div key={index} onClick={() => viewProduct(product)}>
                <section className="search-image-sect">
                  {product.discountedPrice && (
                    <div className="search-discount">
                      {checkDiscountPercent(
                        product.discountedPrice,
                        product.price
                      )}
                      %
                    </div>
                  )}
                  <div
                    className="search-heart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlist(product);
                    }}
                  >
                    <FaRegHeart className="search-icon" />
                  </div>
                  <div className="search-eye">
                    <MdOutlineRemoveRedEye className="search-icon" />
                  </div>
                  <div
                    className="search-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToUpdateProduct(product);
                    }}
                  >
                    <MdOutlineEdit className="search-icon" />
                  </div>
                  <div
                    className="search-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setWarning(product.id);
                    }}
                  >
                    <MdDeleteOutline className="search-icon" />
                  </div>
                  {warning === product.id && (
                    <div className="search-warning">
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
                  <div className="search-image-wrapper">
                    <img
                      loading="lazy"
                      src={product.photo[0]}
                      alt="img"
                      className="search-image"
                    />
                  </div>
                  <div
                    className="search-add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <FiShoppingCart className="search-add-icon" />
                    <p>Add To Cart</p>
                  </div>
                </section>
                <section>
                  <p className="search-item-name">{product.name}</p>
                  {product.discountedPrice && (
                    <span className="search-new-price">
                      ₦{product.discountedPrice}{" "}
                    </span>
                  )}
                  <span
                    className={
                      product.discountedPrice
                        ? "search-old-price"
                        : "search-new-price"
                    }
                  >
                    ₦{product.price}
                  </span>
                  <div className="search-star-rating-wrapper">
                    <Rating
                      name="read-only"
                      value={checkRating(product.rating, "star")}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                    <span className="search-rating">
                      ({checkRating(product.rating, "percent")})
                    </span>
                  </div>
                </section>
              </div>
            )
          )}
        </section>
      </main>
    </Navbar>
  );
};
export default SearchedProducts;
