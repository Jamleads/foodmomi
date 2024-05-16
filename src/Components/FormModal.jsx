import React from "react";
import { LogoBg } from "../assets";
import Button from "./Button";

const FormModal = ({ closeForm }) => {
  return (
    <div>
      <div className="modal lg:w-[50%] w-[90%] mx-auto shadow-2xl">
        <div className="relative md:w-[80%] w-[90%] mx-auto md:py-10 py-5">
          <div
            className="absolute right-0 text-5xl cursor-pointerx"
            onClick={closeForm}
          >
            X
          </div>

          <div className="brand">
            <img src={LogoBg} alt="" className="w-[100px] mx-auto" />
          </div>

          <div className="text-center">
            <h1 className="font-showcase !md:text-2xl !text-base">
              You’re one step to be the first to try It
            </h1>
            <p className="inter-small !text-xs !font-lighter">
              Please enter your details.
            </p>
          </div>

          <form
            action=""
            method="POST"
            className="flex flex-col md:gap-5 gap-3"
          >
            <div className="">
              <label htmlFor="name">Name</label> <br />
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="phone_number">Phone Number</label> <br />
              <input
                required
                type="tel"
                name="phone_number"
                id="phone_number"
                placeholder="Enter your phone pumber"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="email">Email</label> <br />
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="location">Where are you located?</label> <br />
              <select
                name="location"
                id="location"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              >
                <option value="" className="text-red">
                  Select option
                </option>
                <option value="nigeria">Nigeria</option>
                <option value="unitesd state">United State</option>
                <option value="kenya">United Kingdom</option>
                <option value="gambia">Gambia</option>
                <option value="gambia">Other</option>
              </select>
            </div>

            <div className="">
              <label htmlFor="location">
                How did you hear about FoodsByMomi?
              </label>
              <br />
              <select
                name="how_did_you_hear_about_tech_kiddies"
                id="how_did_you_hear_about_tech_kiddies"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              >
                <option value="" className="font-lighter">
                  Select option
                </option>
                <option value="friend">Friend</option>
                <option value="news">News</option>
                <option value="social">Social Media</option>
                <option value="event">Event</option>
              </select>
            </div>

            <div className="text-center">
              <Button
                btnText={"Join waitlist"}
                btnStyle={"bg-primary text-white"}
                btnClick={"submitform"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
