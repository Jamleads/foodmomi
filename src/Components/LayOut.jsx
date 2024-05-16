import Nav from "./Nav";
import { useEffect, useState } from "react";
import Footer from "./Footer.jsx";
import Loader from "./Loader.jsx";
import store from "../Store/store.js";
import { Outlet, useLocation } from "react-router-dom";
import { getLocationByIp } from "../Features/Location.js";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { FbIcon2, IgIcon2, LinkIcon, TwitterIconX } from "../assets/index.js";
import PopModal from "./PopModal.jsx";
import FormModal from "./FormModal.jsx";

const LayOutKid = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [readyToShare, setReadyToShare] = useState(false);
  const locationStatus = useSelector((state) => state.location.status);

  useEffect(() => {
    dispatch(getLocationByIp());
  }, [dispatch]);

  const [popUp, setPopUp] = useState(true);
  const [formPopUp, setFormPopUp] = useState(false);

  return (
    <>
      <ToastContainer />
      {/* {locationStatus === "loading" ? ( */}
      {/* <div className="w-full h-[100vh] flex items-center justify-center bg-[#a8cc4515]">
        <Loader color={"#354231"} width={1000} />
      </div> */}
      {/* ) : ( */}

      <div
        className={`relative w-full ${
          readyToShare ? "overflow-y-hidden h-[100vh]" : ""
        }`}
      >
        {/* Pop up notification */}
        <div className={`${!formPopUp && popUp ? "" : "hidden"}`}>
          <PopModal
            close={() => setPopUp(false)}
            openForm={() => setFormPopUp(true)}
          />
        </div>
        <div
          onClick={() => setPopUp(false)}
          className={`${!formPopUp && popUp ? "" : "hidden"} modal-backdrop`}
        ></div>

        {/* wait list form */}
        <div className={`${formPopUp ? "" : "hidden"}`}>
          <FormModal closeForm={() => setFormPopUp(false)} />
        </div>
        <div
          onClick={() => setFormPopUp(false)}
          className={`${formPopUp ? "" : "hidden"} modal-backdrop`}
        ></div>

        <div className="">
          <Nav />
        </div>

        <div className="mt-[115px]">
          {pathname !== "/" ? (
            <div className="show h-[20vh] w-full flex items-center bg-[#F2F0FF]">
              <div className="w-[70%] mx-auto">
                <h1 className="text-2xl font-bold text-primary capitalize">
                  {pathname.slice(1).replace(/%20/g, " ")}
                </h1>
                <p>
                  Home{" "}
                  <span className="text-pimary">
                    {pathname[0] +
                      " " +
                      pathname.substring(1).replace(/%20/g, " ")}
                  </span>
                </p>
                <p></p>
              </div>
            </div>
          ) : (
            ""
          )}

          <Outlet />
        </div>

        <div className={`footer`}>
          <Footer />
        </div>

        <div
          className={` ${
            readyToShare ? " overflow-y-hidden" : "hidden"
          } moodal fixed top-0 left-0 right-0 h-[100vh] bg-[#c9c6c688] flex items-center justify-center z-40`}
        >
          <div className="flex flex-col items-center justify-center text-center w-[50%] gap-5 bg-white mx-auto py-10 relative">
            <div>
              <h1 className="font-bold text-2xl">Share This Product</h1>
              <p>Spread the word about this product</p>
            </div>

            <div className="flex items-center justify-center text-center gap-5">
              <div
                onClick={() => {}}
                className="text-center cursor-pointer flex flex-col gap-3 items-center justify-center"
              >
                <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                  <img
                    src={FbIcon2}
                    alt="facebook_Icon"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <h2>Facebook</h2>
              </div>
              <div
                onClick={() => {}}
                className="text-center cursor-pointer flex flex-col gap-3 items-center justify-center"
              >
                <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                  <img
                    src={IgIcon2}
                    alt="Instagram"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <h2>Instagram</h2>
              </div>
              <div
                onClick={() => {}}
                className="text-center cursor-pointer flex flex-col gap-3 items-center justify-center"
              >
                <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                  <img
                    src={TwitterIconX}
                    alt="twiterX_icon"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <h2>Twitter/X</h2>
              </div>
              <div
                onClick={() => {}}
                className="text-center cursor-pointer flex flex-col gap-3 items-center justify-center"
              >
                <div className="w-[60px] h-[60px] border-2 border-primary rounded-full flex items-center justify-center">
                  <img src={LinkIcon} alt="facebook_Icon" />
                </div>
                <h2>Copy Link</h2>
              </div>
            </div>

            <p
              className="absolute top-0 right-5 p-5 cursor-pointer"
              onClick={() => setReadyToShare(!readyToShare)}
            >
              X
            </p>
          </div>
        </div>
      </div>

      {/* )} */}
    </>
  );
};

const LayOut = () => {
  return (
    <>
      <Provider store={store}>
        <LayOutKid />
      </Provider>
    </>
  );
};

export default LayOut;
