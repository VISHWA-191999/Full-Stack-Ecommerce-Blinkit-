import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import Search from "./Search";
import { FaUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { IoMdArrowDropup } from "react-icons/io";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
  const isMobile = useMobile();
  const pageLocation = useLocation();
  const searchedPage = pageLocation.pathname === "/search";
  const [userMenu, setUserMenu] = useState(false);
  const user = useSelector((state) => {
    return state?.user;
  });
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);
  console.log("user from store", user);

  console.log(isMobile);
  console.log(searchedPage);
  //  console.log(isMobile) return false if screen width > 768 else true

  const handleUserMenu = () => {
    setUserMenu(false);
  };

  const handleMobileUserMenu = () => {
    console.log("inside handle mobile user menu function");
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  return (
    <header className="bg-white sticky top-0 z-40">
      <div className="h-28 lg:h-16 lg:shadow-md flex shrink-0 justify-between items-center gap-2  lg:gap-10 sticky mt-0">
        {/* logo */}
        <Link to={"/"} className="flex items-center p-2 h-full lg:w-full">
          <img src={logo} alt="logo" className="h-14 lg:h-10 lg:w-30  " />
        </Link>

        {searchedPage && isMobile ? (
          <>
            <Search />
            <div className="flex items-center justify-center h-full lg:w-full   ">
              <button className="hidden items-center mr-2 ">
                <FaUser size={24} />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* <Search/> */}
            <Search />

            {/* login & Cart*/}
            <div className="flex items-center justify-between   px-2 mx-1 h-full lg:w-full lg:ml-12   ">
              {user._id ? (
                <div className="relative hidden lg:block">
                  <div
                    onClick={() => setUserMenu((prev) => !prev)}
                    className="flex items-center gap-1 hover:cursor-pointer"
                  >
                    <p className="font-semibold text-lg"> Account</p>
                    {userMenu ? (
                      <MdOutlineArrowDropDown
                        size={24}
                        className="hover:cursor-pointer"
                      />
                    ) : (
                      <IoMdArrowDropup
                        size={24}
                        className="hover:cursor-pointer"
                      />
                    )}
                  </div>

                  {userMenu && (
                    <div className="absolute top-11 w-44  bg-white  right-0">
                      <UserMenu close={handleUserMenu} />
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"login"} className="hidden lg:block">
                  login
                </Link>
              )}

              <button
                onClick={handleMobileUserMenu}
                className="lg:hidden items-center mr-2  "
              >
                <FaUser size={24} />
              </button>

              {/* for cart and price */}

              {/* <div className="hidden lg:block lg:flex justify-center items-center gap-3 mx-2 p-1 rounded-md bg-green-200 ">
                <div className="animate-bounce">
                  <MdOutlineShoppingCart size={28} />
                </div>
                <div className="flex flex-col justify-between text-lg">
                  <p>items 0</p>
                  <p>total price</p>
                </div>
              </div> */}
              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white"
              >
                {/**add to card icons */}
                <div className="animate-bounce">
                  <MdOutlineShoppingCart size={26} />
                </div>
                <div className="font-semibold text-sm">
                  {cartItem[0] ? (
                    <div>
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {
        openCartSection && <DisplayCartItem close={()=>setOpenCartSection(false)}/>
      }
    </header>
  );
};

export default Header;
