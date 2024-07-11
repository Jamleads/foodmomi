import { useDispatch, useSelector } from "react-redux";
import ProductCard2 from "../components/ProductCard2";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { successToast, warnToast } from "../utilities/ToastMessage";
import { add } from "../features/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FavProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );
  const favorite = useSelector((state) => state.fav);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ///////// CART ///////
  const addToCart = (product) => {
    const isDuplicate = duplicateCheck(cart, product);
    if (isDuplicate) {
      warnToast("Item already in cart, click + to increace the quantity");
    } else {
      dispatch(add(product));
      successToast("Item added to cart");
    }
    navigate("/cart");
  };

  return (
    <div>
      {favorite.length ? (
        <div className="lg:w-[80%] mx-auto mt-5">
          <h1 className="text-2xl font-bold">FAVOURITES PRODUCTS</h1>
          <div className="lg:grid grid-cols-2 lg:gap-x-5 lg:gap-y-10 my-10">
            {favorite.map((favProduct) => (
              <ProductCard2
                key={favProduct.id}
                {...favProduct}
                price={countryPrice(favProduct, country)}
                countryCode={countryCurrency(favProduct, country)}
                description={favProduct.collectionDecription}
                onClickFav={() => addToCart(favProduct)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="lg:w-[80%] h-[30vh] flex items-center justify-center mx-auto mt-5">
          <p>
            You have no favorite product, clcik{" "}
            <Link to="/shop">
              <span className="text-xl text-red-600 font-bold cursor-pointer">
                here
              </span>
            </Link>{" "}
            to ad to favorite
          </p>
        </div>
      )}
    </div>
  );
};

export default FavProduct;
