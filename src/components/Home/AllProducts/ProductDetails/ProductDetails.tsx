import React from "react";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../states/redux/store";
import { ProductType } from "../../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
import { FiTruck } from "react-icons/fi";
import { FaArrowsRotate } from "react-icons/fa6";

const ProductDetails = () => {
  const allProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.products.products
  );
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const checkRating = (rating: Array<string>) => {
    const sum = rating.reduce((acc, value) => acc + Number(value), 0);
    const result = sum / rating.length;
    const ratingStar = Number(result.toFixed(1));
    return ratingStar;
  };
  React.useEffect(() => {
    const product = allProducts.find((item) => item.id === id);
    if (product) {
      setSelectedProduct(product);
    }
  }, [allProducts]);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const handleSelectedColor = (color: string) => {
    const similarProduct = allProducts.find(
      (item) =>
        item.id !== selectedProduct.id &&
        item.name === selectedProduct.name &&
        item.color === color
    );
    if (similarProduct) {
      setSelectedProduct(similarProduct);
      navigate(`/account/product-details/${similarProduct.id}`);
    }
  };

  return (
    <main className="prod-dtls-container">
      <div className="prod-dtls-routes">
        <span>Account</span>
        <span>/</span>
        <span>Gaming</span>
        <span>/</span>
        <div className="prod-dtls-item-name">{selectedProduct.name}</div>
      </div>
      <div className="prod-dtls-wrapper">
        <section className="prod-dtls-img-section">
          <div className="prod-dtls-small-img">
            {selectedProduct?.photo.map((item, index) => (
              <div key={index}>
                <img src={item} alt="img" />
              </div>
            ))}
          </div>
          <div className="prod-dtls-big-img">
            <img src={selectedProduct?.photo[0]} alt="img" />
          </div>
        </section>
        <section className="prod-dtls-info-section">
          <header>Havic HV G-92 Gamepad</header>
          <div className="prod-dtls-rate-rev">
            <Rating
              name="read-only"
              value={checkRating(selectedProduct.rating)}
              readOnly
              precision={0.5}
              size="small"
            />
            <span className="prod-dtls-rev">
              ({selectedProduct.reviews.length} Reviews)
            </span>
            <span className="prod-dtls-hyphen">|</span>
            <span className="prod-dtls-stock">In Stock</span>
          </div>
          <p className="prod-dtls-price">${selectedProduct.price}</p>
          <p className="prod-dtls-dscrptn">{selectedProduct.description}</p>
          <div className="prod-dtls-color">
            <div>Colours:</div>
            {selectedProduct.allColors.map((itemColor, index) => (
              <span
                key={index}
                style={{
                  border:
                    itemColor === selectedProduct.color
                      ? "2px solid black"
                      : "none",
                  width: itemColor === selectedProduct.color ? "15px" : "20px",
                  height: itemColor === selectedProduct.color ? "15px" : "20px",
                }}
                onClick={() => handleSelectedColor(itemColor)}
              >
                <aside
                  style={{
                    backgroundColor: itemColor,
                    width:
                      itemColor === selectedProduct.color ? "15px" : "20px",
                    height:
                      itemColor === selectedProduct.color ? "15px" : "20px",
                  }}
                ></aside>
              </span>
            ))}
          </div>
          <div style={{ backgroundColor: selectedProduct.color }}>
            {selectedProduct.color}
          </div>
          <div className="prod-dtls-sizes">
            <p>Size:</p>
            {selectedProduct.size.map((itemSize, index) => (
              <span key={index}>{itemSize}</span>
            ))}
          </div>
          <div className="prod-dtls-delivery-wrapper">
            <div className="prod-dtls-delivery">
              <FiTruck style={{ fontSize: "25px" }} />
              <div>
                <aside className="prod-dtls-free">Free Delivery</aside>
                <aside className="prod-dtls-postal">
                  Enter your postal code for Delivery Availability
                </aside>
              </div>
            </div>
            <hr className="prod-dtls-horizontal" />
            <div className="prod-dtls-delivery">
              <FaArrowsRotate style={{ fontSize: "25px" }} />
              <div>
                <aside className="prod-dtls-free">Return Delivery</aside>
                <aside className="prod-dtls-postal">
                  Free 30 Days Delivery Returns. Details
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
