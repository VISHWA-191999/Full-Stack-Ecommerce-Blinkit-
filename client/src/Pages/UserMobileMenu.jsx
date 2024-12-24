import React from "react";
import UserMenu from "../components/UserMenu";
import { IoMdClose } from "react-icons/io";

const UserMobileMenu = () => {
  return (
    <section className="flex flex-col  gap-14 ">
      <div><UserMenu/></div>
      <button onClick={()=> window.history.back} className=" mx-auto">
        <IoMdClose size={25}/>
      </button>
    </section>
  );
};

export default UserMobileMenu;
