import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../config/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPassMatched, setIsPassMatched] = useState();
  const navigate = useNavigate();

  const validValue = Object.values(data).every((el) => el); // true: if all the data fields are filled else false
  console.log(validValue); // ['vishwa', 'vishwa@gmail.com', '123', '123']

  console.log(data);
  console.log(setData);
  console.log(SummaryApi.register);

  const handleFormData =async (e) => {
    console.log(e);
    e.preventDefault();

    if (!(data.password === data.confirmPassword)) {
      toast.error("Password is not matched with confirm password");
    }

    try {
      const response =await Axios({ ...SummaryApi.register, data: data });
      console.log(response);

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleInputData = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;

    setData((prevData) => {
      console.log(prevData);
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  console.log(data);

  return (
    <>
      <form
        action=""
        className="bg-gray-900 w-[30%] m-auto rounded-lg text-black mt-4 "
        onSubmit={handleFormData}
        
      >
        <h1 className="text-center my-1 text-xl p-1 text-teal-500 font-bold">
          Register For Binkyit
        </h1>
        <div className="grid gap-1 p-2  bg-teal-300   ">
          <label htmlFor="name" className="text-lg   ">
            Name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            placeholder="Enter ur Name"
            className="border-2 border-red-400 w-[60%] h-6"
            onChange={handleInputData}
          />
        </div>
        <div className="grid gap-1 p-2  bg-teal-300   ">
          <label htmlFor="email" className="text-lg   ">
            Email :
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            placeholder="Enter ur Name"
            className="border-2 border-red-400 w-[60%] h-6"
            onChange={handleInputData}
          />
        </div>
        <div className="grid gap-1 p-2  bg-teal-300   ">
          <label htmlFor="pass" className="text-lg  ">
            Password :
          </label>
          <div className="flex   items-center w-full">
            <input
              type="text"
              id="pass"
              name="password"
              value={data.password}
              placeholder="Enter ur Name"
              className="border-2 border-red-400 w-[60%] h-6"
              onChange={handleInputData}
            />
            <FaRegEye className=" " />
          </div>
        </div>
        <div className="grid gap-1 p-2  bg-teal-300   ">
          <label htmlFor="cnfPass" className="text-lg   ">
            Confirm Password :
          </label>
          <input
            type="text"
            id="cnfPass"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Enter ur Name"
            className="border-2 border-red-400 w-[60%] h-6"
            onChange={handleInputData}
          />
        </div>

        <input
          type="submit"
          value={"Register"}
          className="text-white text-center block w-full p-2 text-xl font-semibold hover:text-green-700 hover:cursor-pointer"
        />
      </form>

      <p className="text-center font-semibold text-lg">
        Already have Account ? <Link to={"/login"} className="hover:text-blue-800 text-lg font-semibold text-blue-400">Login</Link>
      </p>
    </>
  );
};

export default Register;

{
  /* {isPassMatched? (
            <p style={{color:"blue"}}>
                Password Matched
            </p>
          ) : (
            <p style={{color:"red"}}>Password not match </p>
          )} */
}
{
  /* {data.confirmPassword === data.password
          ? "password matched"
          : "not matched"} */
}
