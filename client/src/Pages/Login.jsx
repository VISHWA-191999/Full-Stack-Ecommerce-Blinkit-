import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../config/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
   
    email: "",
    password: "",
    
  });

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleLogin = async (e) => {
    console.log(e);
    e.preventDefault();

   
    try {
      const response =await Axios({ ...SummaryApi.login, data: data });
      console.log(response)
      // console.log(response.message);

      if (response.data.error) {
        toast.error(response.data.message);
        console.log(response.data.error)
      }
    
      if (response.data.success) {
        toast.success(response.data.message);
        console.log("login data",response.data.data.accessToken)
        console.log("login data",response)
        localStorage.setItem("accessToken",response.data.data.accessToken)
        localStorage.setItem('accessToken' ,JSON.stringify( response.data.data.accessToken))
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        localStorage.setItem('testKey', 'testValue');
console.log(localStorage.getItem('testKey'));


        const userDetails=await fetchUserDetails();
        console.log(userDetails)
        dispatch(setUserDetails(userDetails.data))


        setData({
         
          email: "",
          password: "",
         
        });

        navigate("/");
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
       
        className="bg-gray-900 lg:w-[30%] w-[80%] m-auto rounded-lg text-black mt-8"
        onSubmit={handleLogin}
      >
        <h1 className="text-center my-2 text-xl p-1 text-teal-500 font-bold">
          Login
        </h1>
       
        <div className="grid gap-2 p-4  bg-teal-300  ">
          <label htmlFor="email" className="text-lg   ">
            Email :
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            placeholder="Enter ur Name"
            className="border-2 border-red-400 w-[60%] h-8"
            onChange={handleInputData}
          />
        </div>
        <div className="grid  p-4  bg-teal-300  ">
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
              className="border-2 border-red-400 w-[60%] h-8"
              onChange={handleInputData}
            />
            <FaRegEye className=" " />
            
          </div>
          <Link to={"/forgot-password"} className="hover:text-yellow-200">Forgot Password ?</Link>
          
        </div>
     

        <input
          type="submit"
          value={"Login"}
          className="text-white text-center  w-full p-1 text-xl font-semibold hover:cursor-pointer"
        />
      </form>

      <p className="text-center font-semibold text-lg mt-3 ">
        New to Binkyit ? <Link to={"/register"} className="hover:text-blue-800 text-lg font-semibold text-blue-400">Register</Link>
      </p>
    </>
  );
};

export default Login;

