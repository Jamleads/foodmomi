import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Components/CartItem";
import { countryCurrency, countryPrice } from "../Utilities/PriceSelection";
import { clear, remove } from "../Features/CartSlice";
import { errorToast, successToast } from "../Utilities/ToastMessage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckList, CheckMark, ClockIcon } from "../assets";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );

  const [itemTotalAry, setItemTotalAry] = useState(null);
  const [greetMessage, setGreetMessage] = useState(false);
  const [cartValues, setCartValues] = useState(
    Array.from({ length: cart.length }).map((_, index) => ({
      id: cart[index].id,
      count: 1,
      total: 0,
    }))
  );

  // // // // // Scroll // // // // //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // // // // // Price Calculation // // // // //
  useEffect(() => {
    setCartValues(cartValues);
    const totalAry = cartValues.map((item) => item.total);
    setItemTotalAry(totalAry);
  }, [cartValues]);

  const overAllItemTotal = itemTotalAry?.reduce((pre, now) => pre + now, 0);
  const fee = (overAllItemTotal / 100) * 5;
  const chekOutTotal = overAllItemTotal + fee;

  // // // // // Remove Product from Cart // // // // //
  const removeItem = (item) => {
    dispatch(remove(item));
    successToast("Item removed from cart");
    setCartValues(cartValues.filter((product) => product.id !== item));
  };
  const increaseCount = (index) => {
    setCartValues((preValues) => {
      const newValues = [...preValues];
      if (newValues[index].count) {
        newValues[index] = {
          ...newValues[index],
          count: newValues?.[index]?.count + 1,
        };
      }

      return newValues;
    });
  };
  const decreaseCount = (index) => {
    setCartValues((preValues) => {
      const newValues = [...preValues];
      if (newValues[index].count && newValues[index].count > 1) {
        newValues[index] = {
          ...newValues[index],
          count: newValues?.[index]?.count - 1,
        };
      }

      return newValues;
    });
  };

  // // // // // Clear Product from Cart // // // // //
  const clearCart = () => {
    dispatch(clear());
    setCartValues([]);
    successToast("Cart cleard");
  };

  const chechOut = () => {
    if (cart.length) {
      setGreetMessage(!greetMessage);
    } else errorToast(`No item in checkout`);
  };
  return (
    <div className="relative">
      <section
        className={`cartSection lg:w-[80%] w-full h-auto mx-auto lg:mt-24 mt-10 my-20 flex gap-10 overflow-x-hidden ${
          greetMessage ? "blur" : ""
        }`}
      >
        {cart.length ? (
          <div className="lg:w-2/3 py-5 border-y-2 border-green-200">
            <div className="flex items-center lg:mb-8 lg:px-0 px-3">
              <div className="product-side w-2/5 lg:text-xl text-xs text-primary font-bold">
                Products
              </div>

              <div className="price-side w-3/5 flex item-center justify-between text-start">
                <div className="w-1/3 lg:text-xl text-xs text-primary font-bold">
                  Price
                </div>
                <div className="w-1/3 lg:text-xl text-xs text-primary font-bold">
                  Quantity
                </div>
                <div className="w-1/3 lg:text-xl text-xs text-primary font-bold">
                  Total
                </div>
              </div>
            </div>

            {cart.map((item, index) => (
              <CartItem
                key={item.id}
                {...item}
                price={countryPrice(item, country)}
                removeItem={() => removeItem(item.id)}
                countryCode={countryCurrency(item, country)}
                increase={() => increaseCount(index)}
                decrease={() => decreaseCount(index)}
                cartValues={cartValues}
                index={index}
              />
            ))}

            <div className="cart-btns flex items-center justify-between mt-10 lg:mx-0">
              <Link to="/shop">
                <Button
                  btnText={"Update Cart"}
                  btnStyle={`lg:text-base text-xs bg-primary text-white`}
                />
              </Link>

              <Button
                btnText="Clear Cart"
                btnStyle={`lg:text-base text-xs bg-red-600 text-white`}
                btnClick={clearCart}
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center text-navyBlue lg:text-2xl py-10">
              Cart is empty. click{" "}
              <Link to="/shop" className="text-pink font-bold">
                Here
              </Link>{" "}
              to see products
            </p>
          </div>
        )}

        <div className="lg:w-1/3 ml-auto w-full">
          <div className="cart-totals lg:px-0 px-3 sticky bg-primary border-2">
            <h1 className="text-center lg:text-xl my-5 text-white font-bold">
              Cart Totals
            </h1>

            <div className="items-total p-5 bg-[#F4F4FC]">
              <div className="flex items-center justify-between py-5 border-b-2 border-[#E8E6F1]">
                <p className="lg:text-lg text-[#101750] text-bold">
                  {"Item's total:"}{" "}
                  <span className="total-items">({cartValues?.length})</span>
                </p>
                <p className="lg:text-lg text-[rgb(16,23,80)] text-bold">
                  {overAllItemTotal?.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between py-5 border-b-2 border-[#E8E6F1]">
                <p className="lg:text-lg text-[#101750] text-bold">Fees 5%:</p>
                <p className="lg:text-lg text-[#101750] text-bold">
                  {fee.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between py-5 border-b-2 border-[#E8E6F1]">
                <p className="lg:text-lg text-[#101750] text-bold">Total:</p>
                <p className="lg:text-lg text-[#101750] text-bold">
                  {chekOutTotal.toLocaleString()}
                </p>
              </div>

              <button
                className="px-8 py-3 bg-primary checkoutBtn w-full mt-10 mb-5 text-mainWhite"
                onClick={chechOut}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`absolute modal w-full top-0 left-0 right-0 ${
          greetMessage ? "flex justify-center" : "hidden"
        }`}
      >
        <div className="lg:w-[50%] lg:h-[350px] mx-auto p-5 relative flex flex-col items-center justify-center gap-5 rounded-xl border-4 border-dashed bg-mainWhite">
          <div className="absolute top-0 -left-8">
            <img src={ClockIcon} alt="clock-image" width="70px" />
          </div>

          <div className="absolute bottom-0 -right-8">
            <img src={CheckList} alt="checklist-image" width="70px" />
          </div>

          <img src={CheckMark} alt="check-mark-icon" />
          <h1 className="lg:text-3xl font-bold">Your Order is Completed!</h1>
          <p className="text-center font-light w-[80%]">
            Thank you for your order! Your delivery package is being processed
            and will be ready within 3-6 hours. You will receive an email
            confirmation when your delivery package is ready for pick up.
          </p>
          <Link to="/">
            <Button
              btnClick={() => {
                clearCart();
                setGreetMessage(!greetMessage);
              }}
              btnText="Close"
              btnStyle="bg-primary text-white font-bold"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
