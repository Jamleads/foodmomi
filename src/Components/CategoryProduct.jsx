import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { successToast, warnToast } from "../utilities/ToastMessage";
import { useNavigate } from "react-router-dom";
import { addFav } from "../features/FavSlice";
import { add } from "../features/CartSlice";
import { selectProduct } from "../features/SingleProuctSlice";

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.fav);
  const catProducts = useSelector(
    (state) => state.categoryProduct.selectedCatProduct
  );
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );
  // // // // // Scroll // // // // //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  //   Show single product
  const handleProductClick = (product) => {
    dispatch(selectProduct(product));
  };

  return (
    <div className="relative lg:w-[70%] mx-auto my-20">
      <h1 className="text-2xl font-bold mb-6">{catProducts.categoryName}</h1>
      <div
        className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
      >
        {catProducts?.categoryProducts?.map((product) => (
          <div key={[product.id]}>
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
    </div>
  );
};

export default CategoryProduct;
