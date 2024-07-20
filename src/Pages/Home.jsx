/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { add } from "../features/CartSlice";
import { addFav } from "../features/FavSlice";
import Carousel from "../components/Carousel";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../components/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { selectProduct } from "../features/SingleProuctSlice";
import { successToast, warnToast } from "../utilities/ToastMessage";
import { selectedCatProduct } from "../features/CategoryProductSlice";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { newlyAdded } from "../utilities/Dummy";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theState = useSelector((state) => state);
  const allProduct = theState?.allProducts.allProducts;
  const cart = theState?.cart;
  const favorite = theState?.fav;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  console.log("first", allProduct);
  return (
    <>
      <Carousel />

      <div className="relative lg:w-[80%] mx-auto my-20 overflow-x-hidden flex flex-col gap-20">
        {/* <div>
          <h1 className="text-2xl font-bold mb-6">RECENTLY ADDED</h1>
          <div
            className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
          >
            {newlyAdded.map((product) => (
              <div key={product.id}>
                <ProductCard
                  {...product}
                  // productImg={product.imageUrl}
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
        </div> */}

        <div>
          <h1 className="text-2xl font-bold mb-6">Meat and Seafoods</h1>
          <div
            className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
          >
            {allProduct
              .filter((item) => item.categories?.includes("meat and seafood"))
              .map((product) => (
                <div key={product.id}>
                  <ProductCard
                    {...product}
                    productImg={product.imageUrl}
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
              .filter((item) => item.categories?.includes("condiments"))
              .slice(0, 4)
              .map((product, index) => (
                <div key={index}>
                  <ProductCard
                    {...product}
                    productImg={product.imageUrl}
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
              .map((product, index) => (
                <div key={index}>
                  <ProductCard
                    {...product}
                    productImg={product.imageUrl}
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
