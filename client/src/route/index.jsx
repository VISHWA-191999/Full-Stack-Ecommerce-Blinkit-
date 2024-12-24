import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import SearchPage from "../Pages/SearchPage";
import Login from "../Pages/login";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import OtpVerify from "../Pages/OtpVerify";
import ResetPassword from "../Pages/ResetPassword";
import UserMobileMenu from "../Pages/UserMobileMenu";
import Dashboard from "../layout/Dashboard";
import Profile from "../Pages/Profile";
import Category from "../Pages/Category";
import SubCategory from "../Pages/SubCategory";
import UploadProduct from "../Pages/UploadProduct";
import Products from "../Pages/Products";
import AdminPermission from "../layout/AdminPermission";
import ProductListPage from "../Pages/ProductListPage";
import ProductDisplayPage from "../Pages/ProductDisplayPage";
import CartMobile from "../Pages/CartMobile";
import CheckoutPage from "../Pages/CheckoutPage";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel ";
import MyOrders from "../Pages/MyOrders";
import Address from "../Pages/Address";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"search",
        element:<SearchPage/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:'forgot-password',
        element:<ForgotPassword/>
      },
      {
        path:"verify-otp",
        element:<OtpVerify/>
      },
      {
        path:'reset-pass',
        element:<ResetPassword/>
      },
      {
        path:'user',
        element:<UserMobileMenu/>
      },
      {
        path:'dashboard',
        element:<Dashboard/>,
        children:[
          {
            path:'profile',
            element:<Profile/>
          },
          {
            path:'myorders',
            element:<MyOrders/>

          },
          {
            path:"address",
            element:<Address/>
          },
          {
            path:'category',
            element:<AdminPermission><Category/></AdminPermission>
          },
          {
            path:'sub-category',
            element:<AdminPermission><SubCategory/></AdminPermission>
          },
          {
            path:"upload-product",
            element:<AdminPermission><UploadProduct/></AdminPermission>
          },
          {
            path:"products",
            element:<AdminPermission><Products/></AdminPermission>
          }
        ]
      },
      {
        path : ":category",
        children : [
            {
                path : ":subCategory",
                element : <ProductListPage/>
            }
        ]
    },
    {
      path:"product/:product",
      element:<ProductDisplayPage/>
    },
    {
      path:'cart',
      element:<CartMobile/>
    },
    {
      path : "checkout",
      element : <CheckoutPage/>
  },
  {
      path : "success",
      element : <Success/>
  },
  {
      path : 'cancel',
      element : <Cancel/>
  }
    ],
  },
]);

export default router;
