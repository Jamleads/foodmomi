import {
  useLazyClearCartQuery,
  useRemoveItemFromCartMutation,
  useUpdateCartMutation,
} from "../services/cart";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import BarsLoader from "../utilities/BarsLoader";
import { useDispatch, useSelector } from "react-redux";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { errorToast, successToast } from "../utilities/ToastMessage";
import { Link, useOutletContext } from "react-router-dom";
import { CheckList, CheckMark, ClockIcon } from "../assets";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { refetchCart } = useOutletContext();
  const [cartValues, setCartValues] = useState([]);
  const [itemTotalAry, setItemTotalAry] = useState(null);
  const [greetMessage, setGreetMessage] = useState(false);

  const theState = useSelector((state) => state);
  const cart = theState.cart?.cartList;
  const country = theState.location?.location?.country?.name;

  const [removeItemFromCart, { isLoading: loading2 }] =
    useRemoveItemFromCartMutation();
  const [updateCart, { isLoading }] = useUpdateCartMutation();
  const [triggerClearCart, { isLoading: isClearing }] = useLazyClearCartQuery();

  useEffect(() => {
    if (cart?.length > 0) {
      setCartValues(
        cart.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          productImg: item.imageUrl,
          price: countryPrice(item, country),
          countryCode: countryCurrency(item, country),
          total: countryPrice(item, country) * item.quantity,
        }))
      );
    }
  }, [cart, country]);

  //  LEC Price Calculation
  useEffect(() => {
    const totalAry = cartValues?.map((item) => item?.total);
    setItemTotalAry(totalAry);
  }, [cartValues]);
  const overAllItemTotal = itemTotalAry?.reduce((pre, now) => pre + now, 0);
  const fee = (overAllItemTotal / 100) * 5;
  const chekOutTotal = overAllItemTotal + fee;

  const increaseCount = async (item) => {
    const payLoad = {
      id: item.id,
      quantity: item.quantity + 1,
    };
    try {
      await updateCart(payLoad).unwrap();
      refetchCart();
      successToast("Cart updated");
    } catch (error) {
      errorToast(error?.message);
    }
  };
  const decreaseCount = async (item) => {
    if (item.quantity > 1) {
      const payLoad = {
        id: item.id,
        quantity: item.quantity - 1,
      };
      try {
        await updateCart(payLoad).unwrap();
        refetchCart();
        successToast("Cart updated");
      } catch (error) {
        errorToast(error?.message);
      }
    } else {
      removeItem(item.id);
    }
  };

  const removeItem = async (id) => {
    const payLoad = {
      id: id,
    };
    try {
      const res = await removeItemFromCart(payLoad).unwrap();
      refetchCart();
      successToast("Product removed successfully");
    } catch (error) {
      errorToast(error?.message);
    }
  };
  const clearCart = async () => {
    try {
      const res = await triggerClearCart().unwrap();
      refetchCart();
      setCartValues([]);
      successToast("Cart cleard");
    } catch (error) {
      errorToast(error?.message);
    }
  };

  const chechOut = () => {
    if (cart.length) {
      setGreetMessage(!greetMessage);
    } else errorToast(`No item in checkout`);
  };
  return (
    <>
      {isLoading || loading2 || isClearing ? (
        <div className="modal">
          <BarsLoader color={""} height={50} />
        </div>
      ) : (
        ""
      )}
      {isLoading || loading2 || isClearing ? (
        <div className="modal-backdrop"></div>
      ) : (
        ""
      )}

      <div className="relative">
        <section
          className={`cartSection lg:w-[80%] w-full h-auto mx-auto lg:mt-24 mt-10 my-20 flex gap-10 overflow-x-hidden ${
            greetMessage ? "blur" : ""
          }`}
        >
          {cart?.length ? (
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

              {cartValues?.map((item, index) => (
                <CartItem
                  key={index}
                  {...item}
                  increase={() => increaseCount(item)}
                  decrease={() => decreaseCount(item)}
                  removeItem={() => removeItem(item.id)}
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
                  <p className="lg:text-lg text-[#101750] text-bold">
                    Fees 5%:
                  </p>
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
    </>
  );
};

export default Cart;
