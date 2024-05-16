import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Shop from "./Pages/Shop";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Policy from "./Pages/Policy";
import Rewards from "./Pages/Rewards";
import AboutUs from "./Pages/AboutUs";
import Delivery from "./Pages/Delivery";
import LayOut from "./Components/LayOut";
import FavProduct from "./Pages/FavProduct";
import RequestForm from "./Pages/RequestForm";
import ProductDetails from "./Components/ProductDetails";
import CategoryProduct from "./Components/CategoryProduct";
import PopModal from "./Components/PopModal";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/shop/:productName" element={<ProductDetails />} />
        <Route path="/:categories" element={<CategoryProduct />} />
        <Route path="about_us" element={<AboutUs />} />
        <Route path="favorite" element={<FavProduct />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="policy" element={<Policy />} />
        <Route path="request" element={<RequestForm />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
