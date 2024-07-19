import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
// import { allProduct } from "../utilities/Dummy";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { successToast, warnToast } from "../utilities/ToastMessage";
import { addFav } from "../features/FavSlice";
import { add } from "../features/CartSlice";
import { useNavigate } from "react-router-dom";
import { selectProduct } from "../features/SingleProuctSlice";
import { useEffect } from "react";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );
  const theState = useSelector((state) => state);
  const allProduct = theState?.allProducts.allProducts;
  const cart = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.fav);

  // // // // // Scroll // // // // //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ///////// CART ///////
  const addToCart = (product) => {
    const isDuplicate = duplicateCheck(cart, product);
    if (isDuplicate) {
      warnToast("Item already added to cart");
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

  // Selected product for nmore details //
  const handleProductClick = (product) => {
    dispatch(selectProduct(product));
  };

  return (
    <div className="relative lg:w-[80%] mx-auto my-20">
      <h1 className="text-2xl font-bold mb-6">All PRODUCT</h1>
      <div
        className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
      >
        {allProduct.map((product) => (
          <div key={[product.id]}>
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
    </div>
  );
};

export default Shop;
