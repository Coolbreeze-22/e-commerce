import "./NewArrival.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import newArrivalWoman from "../../../assets/newArrivalWoman.png";
import { useNavigate } from "react-router-dom";
import { handleCategoryNavigation } from "../../utils/utilityFunctions";
import { FiTruck } from "react-icons/fi";
import { RiCustomerServiceLine } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";

const NewArrival = () => {
  const { newArrival } = useSelector(
    (state: RootState) => state.productReducer
  );
  const navigate = useNavigate();
 
  const viewProduct = (id: string) => {
    navigate(`/product-details/${id}`);
  };
  const categoryNavigation = (itemCategory: string, label: string) => {
    handleCategoryNavigation({ itemCategory, label, navigate });
  };

  return (
    <main className="new-container">
      <div className="new-info">
        <aside></aside>
        <p>Featured</p>
      </div>
      <header className="new-header">New Arrival</header>
      <section className="new-image-area">
        <div className="new-image-wrapper1">
          <img src={newArrival[1]?.photo[0]} alt="loading" />
          <aside className="new-item-info">
            <p className="new-item-name">{newArrival[1]?.name}</p>
            <p className="new-item-description">{newArrival[1]?.description}</p>
            <p
              className="new-item-shop"
              onClick={() => viewProduct(newArrival[1]?.id)}
            >
              Shop Now
            </p>
          </aside>
        </div>

        <div className="new-image-wrapper2">
          <div className="new-image-wrapper2a">
            <img src={newArrivalWoman} alt="loading" />
            <aside className="new-item-info">
              <p className="new-item-name">Women's Collections</p>
              <p className="new-item-description">
                Featured woman collections that give you another vibe.
              </p>
              <p
                className="new-item-shop"
                onClick={() =>
                  categoryNavigation("women's-fashion", "category")
                }
              >
                Shop Now
              </p>
            </aside>
          </div>

          <div className="new-image-wrapper2b">
            <img src={newArrival[2]?.photo[0]} alt="loading" />
            <aside className="new-item-info2">
              <p className="new-item-name">{newArrival[2]?.name}</p>
              <p className="new-item-description">
                {newArrival[2]?.description}
              </p>
              <p
                className="new-item-shop"
                onClick={() => viewProduct(newArrival[2]?.id)}
              >
                Shop Now
              </p>
            </aside>
          </div>

          <div className="new-image-wrapper2c">
            <img src={newArrival[0]?.photo[0]} alt="loading" />
            <aside className="new-item-info2">
              <p className="new-item-name">{newArrival[0]?.name}</p>
              <p className="new-item-description">
                {newArrival[0]?.description}
              </p>
              <p
                className="new-item-shop"
                onClick={() => viewProduct(newArrival[0]?.id)}
              >
                Shop Now
              </p>
            </aside>
          </div>
        </div>
      </section>
      <section className="new-icon-section">
        <div>
          <div className="new-truck-icon">
            <aside className="new-icon-aside">
              <FiTruck className="new-icon" />
            </aside>
          </div>
          <div className="new-icon-info">
            <p>FREE AND FAST DELIVERY</p>
            <p>Free delivery for all orders over $140</p>
          </div>
        </div>
        <div>
          <div className="new-service-icon">
            <aside className="new-icon-aside">
              <RiCustomerServiceLine className="new-icon" />
            </aside>
          </div>
          <div className="new-icon-info">
            <p>24/7 CUSTOMER SERVICE</p>
            <p>Friendly 24/7 customer support</p>
          </div>
        </div>
        <div>
          <div className="new-verified-icon">
            <aside className="new-icon-aside">
              <MdOutlineVerifiedUser className="new-icon" />
            </aside>
          </div>
          <div className="new-icon-info">
            <p>MONEY BACK GUARANTE</p>
            <p>We return money within 30 days</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewArrival;
