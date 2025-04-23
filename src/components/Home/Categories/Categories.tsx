import "./Categories.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cartegoryBreakPoints } from "../../utils/breakPoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { getIcon } from "./CategoriesIcon";
import { useNavigate } from "react-router-dom";
import { handleCategoryNavigation } from "../../utils/utilityFunctions";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

const Categories = () => {
  const { subCategory } = useSelector(
    (state: RootState) => state.productReducer
  );
const navigate = useNavigate()

  const categoryNavigation = (itemCategory: string, label: string) => {
      handleCategoryNavigation({itemCategory, label, navigate})
    };


  return (
    <main className="category-container">
      <section>
        <div className="category-text">
          <span className="category-red"></span>
          <span className="category-categories">Categories</span>
        </div>
        <header className="category-header">
          <div>Browse By Category</div>
          <section className="category-swiper-arrow">
            <div className="category-button-prev">
              <SlArrowLeft className="category-slide-icon"/>
            </div>
            <div className="category-button-next">
              <SlArrowRight className="category-slide-icon"/>
            </div>
          </section>
        </header>
      </section>

      <section className="category-swiper">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerGroup={2}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".category-button-next",
            prevEl: ".category-button-prev",
          }}
          breakpoints={cartegoryBreakPoints}
        >
          {subCategory.map((category, index) => {
            const Icon = getIcon(category);
            return (
              <SwiperSlide key={index} onClick={()=> categoryNavigation(category, "sub-category")} className="category-swiper-slide">
                <div>{Icon && <Icon className="category-icon" />}</div>
                <p>{category}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </main>
  );
};

export default Categories;
