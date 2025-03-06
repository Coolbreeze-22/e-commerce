// import React from 'react'
import "./Categories.css";
import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { TiWatch } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import { PiHeadphonesThin } from "react-icons/pi";
import { MdOutlineVideogameAsset } from "react-icons/md";

const Categories = () => {
  return (
    <main className="category-container">
      <section>
        <div className="category-text">
          <span className="category-red"></span>
          <span className="category-categories">Categories</span>
        </div>
        <header className="category-header">
          <div>Browse By Category</div>
        </header>
      </section>

      <section className="category-carousel">
        <div>
          <div>
            <IoIosPhonePortrait className="category-icon"/>
          </div>
          <p>Phones</p>
        </div>
        <div>
          <div>
            <HiOutlineDesktopComputer className="category-icon"/>
          </div>
          <p>Computers</p>
        </div>
        <div>
          <div>
            <TiWatch className="category-icon"/>
          </div>
          <p>SmartWatch</p>
        </div>
        <div>
          <div>
            <FiCamera className="category-icon"/>
          </div>
          <p>Camera</p>
        </div>
        <div>
          <div>
            <PiHeadphonesThin className="category-icon"/>
          </div>
          <p>HeadPhones</p>
        </div>
        <div>
          <div>
            <MdOutlineVideogameAsset className="category-icon"/>
          </div>
          <p>Gaming</p>
        </div>
        <div>
          <div>
            <IoIosPhonePortrait className="category-icon"/>
          </div>
          <p>Phones</p>
        </div>
      </section>
    </main>
  );
};

export default Categories;
