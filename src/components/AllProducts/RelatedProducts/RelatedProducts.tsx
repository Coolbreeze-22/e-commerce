import React from "react";
import "./RelatedProducts.css";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../states/redux/reducerTypes";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";

export const RelatedProducts = ({ product }: { product: ProductType }) => {
  const allProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.products.products
  );
  const relatedProducts = allProducts.filter(
    (item) => item.id !==product.id && item.category === product.category
  );

  const navigate = useNavigate();

  const viewProduct = (product: ProductType) => {
    navigate(`/account/product-details/${product.id}`);
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

  return (
    <main className="related-container">
      <section className="related-info">
        <span className="related-red"></span>
        <span className="related-related">Related Items</span>
      </section>
      <section className="related-wrapper">
        {relatedProducts.map((relatedProduct, index) => (
          <div key={index} onClick={() => viewProduct(relatedProduct)}>
            <section className="related-image-sect">
              <div className="related-heart">
                <FaRegHeart className="related-icon" />
              </div>
              <div className="related-eye">
                <MdOutlineRemoveRedEye className="related-icon" />
              </div>
              <div>
                <img
                  loading="lazy"
                  src={relatedProduct.photo[0]}
                  alt="loading"
                  className="related-image"
                />
              </div>
            </section>
            <section>
              <div>
                <p className="related-item-name">{relatedProduct.name}</p>
                {relatedProduct.discountedPrice && (
                  <span className="related-new-price">
                    ${relatedProduct.discountedPrice}
                  </span>
                )}
                <span
                  className={
                    relatedProduct.discountedPrice
                      ? "related-old-price"
                      : "best-new-price"
                  }
                >
                  ${relatedProduct.price}
                </span>
                <div className="related-star-rating-wrapper">
                  <Rating
                    name="read-only"
                    value={checkRating(relatedProduct.rating, "star")}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  <span className="related-rating">
                    ({checkRating(relatedProduct.rating, "percent")})
                  </span>
                </div>
              </div>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};
