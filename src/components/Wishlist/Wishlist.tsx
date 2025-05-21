import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { addItemToCart } from "../utils/utilityFunctions";
import Navbar from "../Navbar/Navbar";
import { removeFromWishlist } from "../../controller/cartController";
import CustomButton from "../CustomButton/CustomButton";
import WishlistProducts from "./WishlistProducts/WishlistProducts";
import { useNavigate } from "react-router-dom";
import { useFetchProducts } from "../../controller/productController";

const Wishlist = () => {
  const { wishlist } = useSelector((state: RootState) => state.cartReducer);
  const { bestSelling, products } = useSelector(
    (state: RootState) => state.productReducer
  );
  const dispatch = useDispatch();
  useFetchProducts(products.length, dispatch);
  
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (id: string, label: string) => {
    removeFromWishlist({ id, label, dispatch });
  };

  const handleAddAllToCart = () => {
    for (const item of wishlist) {
      addItemToCart({
        item,
        size: item.size,
        quantity: 1,
        dispatch,
      });
      handleRemoveFromWishlist(item.id, "no notification");
    }
  };
  return (
    <Navbar>
      <main className="wishlist-container">
        {!wishlist.length ? (
          <div className="wishlist-no-item">
            No item in wishlist yet!<button>view products</button>
          </div>
        ) : (
          <>
            <div className="wishlist-header-wrapper">
              <header className="wishlist-header">
                Wishlist ({wishlist.length})
              </header>
              <CustomButton
                text="Move All To Bag"
                className="wishlist-move-btn"
                onClick={handleAddAllToCart}
              />
            </div>
            <WishlistProducts products={wishlist} isWishlist={true} />
            <div className="wishlist-more-info">
              <aside></aside>
              <p>Just For You</p>
              <CustomButton
                text="See All"
                className="wishlist-see-btn"
                onClick={() => navigate("/products")}
              />
            </div>
            <WishlistProducts products={bestSelling} isWishlist={false} />
          </>
        )}
      </main>
    </Navbar>
  );
};

export default Wishlist;
