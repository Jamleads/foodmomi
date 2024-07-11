import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { useNavigate } from "react-router-dom";
import { successToast, warnToast } from "../utilities/ToastMessage";
import { add } from "../features/CartSlice";
import Button from "./Button";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorite = useSelector((state) => state.fav);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );

  // // // // // Scroll // // // // //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = (product) => {
    const isDuplicate = duplicateCheck(favorite, product);
    if (isDuplicate) {
      warnToast("Item already in cart, click + to increace the quantity");
    } else {
      dispatch(add(product));
      successToast("Item added to cart");
    }
    navigate("/cart");
  };

  return (
    <div className="lg:w-[80%] mx-auto my-20">
      {selectedProduct === null ? (
        "No product was selected"
      ) : (
        <div className="lg:flex gap-10">
          <div className="zoom-wrapper lg:h-[500px] lg:w-1/2 bg-white shadow-xl border-t-2 border-primary flex items-center justify-center">
            <img src={selectedProduct?.productImg} alt="" />
          </div>

          <div className="lg:w-1/2 lg:p-0 p-5">
            <p className="title lg:text-3xl text-xl text-primary font-bold">
              {selectedProduct?.title}
            </p>
            <p className="price text-primary lg:text-2xl font-bold mt-3">
              {countryCurrency(selectedProduct, country)}{" "}
              {countryPrice(selectedProduct, country)}
            </p>

            <div className="description text-base px-10 my-5 leading-10">
              {selectedProduct?.collectionDecription}
            </div>

            <div>
              <h1 className="text-black font-bold text-2xl my-2">
                Avalability:{" "}
                <span className="text-primary font-light">in stock</span>{" "}
              </h1>
            </div>

            <div className="flex gap-3 my-3">
              <div className="lg:w-[80px] w-[50px] flex items-center justify-center bg-[#F0EFF2]">
                <input
                  type="number"
                  className="w-1/2 bg-transparent text-center text-primary font-bold"
                  placeholder="1"
                />
              </div>

              <Button
                btnClick={() => addToCart(selectedProduct)}
                btnStyle={"bg-primary text-white"}
                btnText={"Add To Cart"}
              />
            </div>

            <p className="text-primary mt-1">
              Categories: <span>{selectedProduct?.categories.join(", ")}</span>
            </p>

            <button className="w-full font-bold text-xl text-white py-2 bg-blue mt-4">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
