/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { add } from "../Features/CartSlice";
import { addFav } from "../Features/FavSlice";
import Carousel from "../Components/Carousel";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../Components/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Features/productSlice";
import { duplicateCheck } from "../Utilities/DuplicateCheck";
import { selectProduct } from "../Features/SingleProuctSlice";
import { successToast, warnToast } from "../Utilities/ToastMessage";
import { selectedCatProduct } from "../Features/CategoryProductSlice";
import { countryCurrency, countryPrice } from "../Utilities/PriceSelection";
import { allProduct, newlyAdded } from "../Utilities/Dummy";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.fav);

  // // // // // Scroll // // // // //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ///////// country ..///////
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );

  // ///////// CART ///////
  const addToCart = (product) => {
    const isDuplicate = duplicateCheck(cart, product);
    if (isDuplicate) {
      navigate("/cart");
      warnToast("Item already in cart, click + to increace the quantity");
    } else {
      dispatch(add(product));
      successToast("Item added to cart");
    }
  };

  // ///////// FAVOURITES ///////  //
  const addToFav = (product) => {
    const isDuplicate = duplicateCheck(favorite, product);
    if (isDuplicate) {
      warnToast("Item already in favourite");
      navigate("/favorite");
    } else {
      dispatch(addFav(product));
      successToast("Item added to favourite");
    }
  };

  const handleProductClick = (product) => {
    dispatch(selectProduct(product));
  };

  const handleCategoryClick = (category) => {
    const theArray = allProduct.filter((item) =>
      item.categories.includes(category)
    );
    const data = { categoryName: category, categoryProducts: theArray };
    dispatch(selectedCatProduct(data));
  };

  return (
    <>
      <Carousel />

      <div className="relative lg:w-[80%] mx-auto my-20 overflow-x-hidden flex flex-col gap-20">
        <div>
          <h1 className="text-2xl font-bold mb-6">RECENTLY ADDED</h1>
          <div
            className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
          >
            {newlyAdded.map((product) => (
              <div key={product.id}>
                <ProductCard
                  {...product}
                  price={countryPrice(product, country)}
                  countryCode={countryCurrency(product, country)}
                  onClickCart={() => addToCart(product)}
                  onClickFav={() => addToFav(product)}
                  onClickToDetails={() => handleProductClick(product)}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-10">
            <Link to="shop">
              <button className="py-2 px-5 bg-primary shadow-2xl rounded-md text-white font-bold">
                Load More
              </button>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-6">Meat and Seafoods</h1>
          <div
            className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
          >
            {allProduct
              .filter((item) => item.categories?.includes("Meat and Seafoods"))
              .map((product) => (
                <div key={product.id}>
                  <ProductCard
                    {...product}
                    price={countryPrice(product, country)}
                    countryCode={countryCurrency(product, country)}
                    // Actions
                    onClickCart={() => addToCart(product)}
                    onClickFav={() => addToFav(product)}
                    onClickToDetails={() => handleProductClick(product)}
                  />
                </div>
              ))}
          </div>

          <div className="flex items-center justify-center mt-10">
            <Link
              to={`/Meat and Seafoods`}
              onClick={() => handleCategoryClick("Meat and Seafoods")}
            >
              <button className="py-2 px-5 bg-primary shadow-2xl rounded-md text-white font-bold">
                Load More
              </button>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-6">Condiments</h1>
          <div
            className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
          >
            {allProduct
              .filter((item) => item.categories?.includes("Condiments"))
              .slice(0, 4)
              .map((product) => (
                <div key={product.id}>
                  <ProductCard
                    {...product}
                    price={countryPrice(product, country)}
                    countryCode={countryCurrency(product, country)}
                    // Actions
                    onClickCart={() => addToCart(product)}
                    onClickFav={() => addToFav(product)}
                    onClickToDetails={() => handleProductClick(product)}
                  />
                </div>
              ))}
          </div>

          <div className="flex items-center justify-center mt-10">
            <Link
              to={`/Condiments`}
              onClick={() => handleCategoryClick("Condiments")}
            >
              <button className="py-2 px-5 bg-primary shadow-2xl rounded-md text-white font-bold">
                Load More
              </button>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-6">Grains and Flours</h1>
          <div
            className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
          >
            {allProduct
              .filter((item) => item.categories?.includes("Grains and Flours"))
              .slice(0, 4)
              .map((product) => (
                <div key={product.id}>
                  <ProductCard
                    {...product}
                    price={countryPrice(product, country)}
                    countryCode={countryCurrency(product, country)}
                    // Actions
                    onClickCart={() => addToCart(product)}
                    onClickFav={() => addToFav(product)}
                    onClickToDetails={() => handleProductClick(product)}
                  />
                </div>
              ))}
          </div>

          <div className="flex items-center justify-center mt-10">
            <Link
              to={`/Grains and Flours`}
              onClick={() => handleCategoryClick("Grains and Flours")}
            >
              <button className="py-2 px-5 bg-primary shadow-2xl rounded-md text-white font-bold">
                Load More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
