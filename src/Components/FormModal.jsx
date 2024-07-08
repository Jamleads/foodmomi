import React, { useState } from "react";
import { LogoBg } from "../assets";
import Button from "./Button";
import { useJoinWaitlistMutation } from "../services/waitlist";
import { validateForm } from "../Utilities/validateForm";
import { errorToast, successToast } from "../Utilities/ToastMessage";

const FormModal = ({ closeForm }) => {
  const [joinWaitlist, { isLoading }] = useJoinWaitlistMutation();

  const [waitlist, setWaitlist] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    heard_about_us: "",
  });
  const handleChnage = (e) => {
    const { id, value } = e.target;
    setWaitlist({ ...waitlist, [id]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm(waitlist)) {
      errorToast("all feilds are required");
    } else {
      try {
        const res = await joinWaitlist(waitlist).unwrap();
        console.log("first attempt", res);
        successToast("Thank you for joining our waitlist");
      } catch (error) {
        errorToast(error.data.message);
      }
      closeForm();
    }
  };

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
                onChange={(e) => handleChnage(e)}
                placeholder="Enter your name"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="phone_number">Phone Number</label> <br />
              <input
                required
                type="tel"
                name="phone"
                id="phone"
                onChange={(e) => handleChnage(e)}
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
                onChange={(e) => handleChnage(e)}
                placeholder="Enter your email"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="location">Where are you located?</label> <br />
              <select
                name="location"
                id="location"
                onChange={(e) => handleChnage(e)}
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              >
                <option value="" className="text-red">
                  Select option
                </option>
                {/* TODO: TRY GET LOCATION BASE ON THE COUNTRY MARKET WE ARE */}
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
                name="heard_about_us"
                id="heard_about_us"
                onChange={(e) => handleChnage(e)}
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
                btnClick={submitForm}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
