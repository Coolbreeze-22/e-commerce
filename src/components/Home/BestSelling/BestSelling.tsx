import React from "react";
import "./BestSelling.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { products } from "../../../dummy/dummyProducts";
import type { ProductType } from "../../../dummy/dummyProducts";
import { Rating } from "@mui/material";
// import { useNavigate } from "react-router-dom";

export const BestSelling = () => {
    const [storeUniqueProducts, setStoreUniquProduct] = React.useState<ProductType[]>([]);
  
  const bestProducts = products.filter((product) => product.bestSelling === true)
  
    const length = bestProducts.length;
    
      React.useEffect(() => {
        const handleBestSelling = () => {
          let uniqueCategories: Set<string> = new Set();
          const uniqueProducts: ProductType[] = [];
          for (let i = 0; i < length; i++) {
            const product = bestProducts[i];
            if (!uniqueCategories.has(product.category)) {
              uniqueCategories.add(product.category);
              uniqueProducts.push(product);
            }
          }
          setStoreUniquProduct(uniqueProducts);
        };
    
        handleBestSelling();
      }, [length]);
  //   const navigate = useNavigate();

  //   const viewProduct = () => {
  //     navigate("./");
  //   };

  return (
    <main className="best-container">
      <section className="best-info">
        <div className="best-text">
          <span className="best-red"></span>
          <span className="best-month">This Month</span>
        </div>
        <header className="best-header">
          <div>Best Selling Products</div>
        </header>
      </section>

      <section className="best-carousel">
        {storeUniqueProducts.map((product, index) => (
          <div key={index}>
            <section className="best-image-sect">
              <div className="best-heart">
                <FaRegHeart className="best-icon"/>
              </div>
              <div className="best-eye">
                <MdOutlineRemoveRedEye className="best-icon"/>
              </div>
              <div>
                <img src={product.photo} alt="coat" className="best-image" />
              </div>
            </section>
            <section>
              <div>
                <p className="best-item-name">{product.name}</p>
                {product.discountedPrice && (
                  <span className="best-new-price">
                    ${product.discountedPrice}{" "}
                  </span>
                )}
                <span
                  className={
                    product.discountedPrice
                      ? "best-old-price"
                      : "best-new-price"
                  }
                >
                  ${product.price}
                </span>
                <div className="best-star-rating-wrapper">
                  <Rating name="read-only" value={product.rating} readOnly precision={0.5} size="small"
                  />
                  <span className="best-rating">(65)</span>
                </div>
              </div>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BestSelling;
