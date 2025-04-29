import "./Service.css";
import { FiTruck } from "react-icons/fi";
import { RiCustomerServiceLine } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Service = () => {
  return (
    <section className="service-icon-section">
      <div>
        <div className="service-truck-icon">
          <aside className="service-icon-aside">
            <FiTruck className="service-icon" />
          </aside>
        </div>
        <div className="service-icon-info">
          <p>FREE AND FAST DELIVERY</p>
          <p>Free delivery for all orders over $140</p>
        </div>
      </div>
      <div>
        <div className="service-service-icon">
          <aside className="service-icon-aside">
            <RiCustomerServiceLine className="service-icon" />
          </aside>
        </div>
        <div className="service-icon-info">
          <p>24/7 CUSTOMER SERVICE</p>
          <p>Friendly 24/7 customer support</p>
        </div>
      </div>
      <div>
        <div className="service-verified-icon">
          <aside className="service-icon-aside">
            <MdOutlineVerifiedUser className="service-icon" />
          </aside>
        </div>
        <div className="service-icon-info">
          <p>MONEY BACK GUARANTE</p>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </section>
  );
};

export default Service;
