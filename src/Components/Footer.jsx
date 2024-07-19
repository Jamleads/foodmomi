import { Link } from "react-router-dom";
import { FbIcon, IgIcon, LogoBg, TwitterIcon2 } from "../assets";
import { categories, allProduct } from "../utilities/Dummy";
import { useDispatch } from "react-redux";
import { selectedCatProduct } from "../features/CategoryProductSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const handleCategoryClick = (category) => {
    const theArray = allProduct.filter((item) =>
      item.categories.includes(category)
    );
    const data = { categoryName: category, categoryProducts: theArray };
    dispatch(selectedCatProduct(data));
  };
  return (
    <div className="footer bg-[#EEEFFB]">
      <div className="text-center w-[70%] mx-auto">
        Could not find the product you need? click{" "}
        <Link to="request">
          <span className="text-xl text-red-600 font-bold cursor-pointer">
            here
          </span>
        </Link>{" "}
        to make a request
      </div>

      <div className="footer-top lg:p-0 px-5 py-5">
        <div className="footer-top-wrap lg:w-[70%] mx-auto lg:py-20 flex lg:flex-row flex-col justify-between gap-5">
          <div className="lg:w-2/5">
            <Link to="/">
              <div className="w-[100px] h-[50px]flex items-center justify-center">
                <img src={LogoBg} alt="logo" width="80%" />
              </div>
            </Link>
            <div className="w-full bg-[#ffffff] my-3 flex items-center justify-between">
              <input type="text" className="w-[70%] py-2 px-5" />
              <button className="py-2 px-5 text-xs bg-primary shadow-2xl rounded-md text-white font-bold">
                Sign Up
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              <p className="text-[#8A8FB9] text-sm">Contact Address</p>
              <li className="text-[#8A8FB9] text-sm list-disc">
                FoodsbyMomi Ltd No 2, Adenuga Street Off Williams Estate ,
                Surulere Lagos , Nigeria +234-909 011 0000
              </li>
              <li className="text-[#8A8FB9] text-sm list-disc">
                FoodsbyMomi Ltd 128, City Road London Ec1v2nx +44 20 8133 9447
              </li>
            </ul>
          </div>

          <div className="footer-links-wrap lg:w-1/5">
            <p className="text-[#000000] text-xl font-bold">Catagories</p>
            <ul className="mt-5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/${category.category}`}
                  onClick={() => handleCategoryClick(category.category)}
                >
                  <li className="text-[#8A8FB9] py-1 text-sm">
                    {category.category}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="footer-links-wrap lg:w-1/5">
            <p className="text-[#000000] text-xl font-bold">Customer Care</p>
            <ul className="mt-5">
              <a href="#">
                <li className="text-[#8A8FB9] text-sm">My Account</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Discount</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Returns</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Orders History</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Order Tracking</li>
              </a>
            </ul>
          </div>

          <div className="footer-links-wrap lg:w-1/5">
            <p className="text-[#000000] text-xl font-bold">Pages</p>
            <ul className="mt-5">
              <a href="#">
                <li className="text-[#8A8FB9] text-sm">Blog</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Browse the Shop</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Category</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Pre-Built Pages</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">
                  Visual Composer Elements
                </li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">
                  WooCommerce Pages
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom bg-[#E7E4F8] lg:p-0 px-5 py-5">
        <div className="footer-button-wrap flex items-center justify-between py-2 lg:w-[60%] mx-auto">
          <p className="text-[#8A8FB9] text-sm">
            &copy;<a href="/">Foodsbymomi</a> - All Rights Reserved
          </p>
          <div className="flex items-center gap-3 rounded-full">
            <div className="git bg-[#151875] w-[25px] h-[25px] flex items-center justify-center rounded-full">
              <a href="#">
                <img src={FbIcon} alt="" />
              </a>
            </div>
            <div className="linkedin bg-[#151875] w-[25px] h-[25px] flex items-center justify-center rounded-full">
              <a href="#">
                <img src={IgIcon} alt="" />
              </a>
            </div>
            <div className="twitter bg-[#151875] w-[25px] h-[25px] flex items-center justify-center rounded-full">
              <a href="#">
                <img src={TwitterIcon2} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
