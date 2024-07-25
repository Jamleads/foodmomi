import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Policy from "./pages/Policy";
import Rewards from "./pages/Rewards";
import AboutUs from "./pages/AboutUs";
import Delivery from "./pages/Delivery";
import LayOut from "./components/LayOut";
import FavProduct from "./pages/FavProduct";
import RequestForm from "./pages/RequestForm";
import FormModal from "./components/FormModal";
import ProductDetails from "./components/ProductDetails";
import CategoryProduct from "./components/CategoryProduct";
import Order from "./pages/Order";
import ErrorPage from "./pages/ErrorPage";
import OrderDetails from "./pages/OrderDetails";
import { useEffect } from "react";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayOut />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="waitlist" element={<FormModal />} />
      <Route path="shop" element={<Shop />} />
      <Route path="orders" element={<Order />} />
      <Route path="order_details/:id" element={<OrderDetails />} />
      <Route path="shop/:productName" element={<ProductDetails />} />
      <Route path=":categories" element={<CategoryProduct />} />
      <Route path="about_us" element={<AboutUs />} />
      <Route path="favorite" element={<FavProduct />} />
      <Route path="rewards" element={<Rewards />} />
      <Route path="delivery" element={<Delivery />} />
      <Route path="policy" element={<Policy />} />
      <Route path="request" element={<RequestForm />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    // Adding the Meta Pixel script to the document
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    fbq("init", "1417698485560433");
    fbq("track", "PageView");

    // Adding the noscript tag with the tracking image
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src =
      "https://www.facebook.com/tr?id=1417698485560433&ev=PageView&noscript=1";
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }, []);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
