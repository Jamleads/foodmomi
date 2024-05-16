import React from "react";
import Button from "./Button";
import { BrandProduct, LogoBg } from "../assets";

const PopModal = ({ close, openForm }) => {
  return (
    <>
      <div className="modal lg:w-[70%] w-[90%] mx-auto shadow-2xl">
        <div className="relative md:px-20 p-5 md:py-10 text-center">
          <div className="flex items-center justify-center">
            <img src={LogoBg} alt="" className=" w-[200px]" />
          </div>
          <div className="content flex flex-col gap-5">
            <p className="md:text-base text-xs">
              Get ready for an exciting culinary journey! FoodsByMomi is
              thrilled to introduce you to the vibrant and diverse flavors of
              African cuisine. Our brand-new line of delicious products is
              launching soon, bringing you authentic tastes straight from the
              heart of Africa.{" "}
              <span className="text-secondary underline">
                <a href={BrandProduct} target="_blank">
                  View brand product
                </a>
              </span>
            </p>

            <p className="md:text-base text-xs">
              We're looking for passionate partners to join us on this flavorful
              adventure. If you're interested in becoming a distributor to all
              African foods shop in USA, Canada, Europe and uk, please reach out
              to us at{" "}
              <span className="text-secondary underline">
                <a href="mailto: hello@foodsbymomi.com" target="_blank">
                  hello@foodsbymomi.com.
                </a>
              </span>{" "}
              Join our waitlist to be the first to hear about our product
              launch!{" "}
              <button onClick={openForm} className="text-secondary underline">
                Join waitlist
              </button>
            </p>

            {/* <div class="subscribe md:w-[60%] mx-auto">
              <form action="" class="flex items-center justify-between">
                <input
                  type="email"
                  required
                  placeholder="Enter your email to join waitlist"
                  class="px-5 py-2 md:border-2 border-[1px] border-primary md:w-[70%] w-[60%] bg-transparent md:text-base text-xs"
                />
                <div class="flex items-center justify-center md:mt-0 mt-1">
                  <button
                    className={`md:px-8 px-3 md:py-3 py-2 bg-primary text-white md:text-base text-xs `}
                    onClick={"waitlist"}
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            </div> */}

            <p className="md:text-base text-xs">
              Stay connected with us on social media to be the first to know
              about our launch and to explore more about African cuisine. Join
              us as we celebrate culture, community, and the joy of food!{" "}
              <span className="text-secondary underline">
                <a
                  href="https://www.instagram.com/foodsbymomi?igsh=bmMxbGxvMTV6OWN1"
                  target="_blank"
                >
                  Instagram
                </a>
              </span>
              {", "}
              <span className="text-secondary underline">
                <a href="https://whatsapp.com/+447376368788" target="_blank">
                  What'sApp
                </a>
              </span>
            </p>

            <div>
              <Button
                btnText={"Close"}
                btnStyle={"bg-primary text-white"}
                btnClick={close}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopModal;
