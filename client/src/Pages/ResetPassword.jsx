import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../config/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    newPasword: "",
    confirmNewPassword: "",
  });
  console.log(password);

  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setPassword((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    console.log(password.newPasword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password.newPasword === password.confirmNewPassword) {
      try {
        const response = await Axios({
          ...SummaryApi.resetPassword,
          data: {
            email: location.state.email,
            data: password,
          },
        });

        if (response.data.error) {
          toast.error(response.data.message);
        }

        if (response.data.success) {
          toast.success(response.dada.message);
          setPassword({ newPasword: "", confirmNewPassword: "" });
          navigate("/login");
        }
      } catch (error) {
        AxiosToastError(error);
      }
    } else {
      toast.error("Entered Password and Confirm Password must be same ");
    }
  };
  return (
    <form
      action=""
      className="grid  w-[40%] bg-slate-500 p-3 mt-5 m-auto gap-4 rounded-lg"
      onSubmit={handleResetPassword}
    >
      <h1 className="underline text-center font-bold text-2xl mt-2">
        Reset Password
      </h1>
      <div className="grid p-1 text-white gap-1 ">
        <label htmlFor="new-pass"> New Password :</label>
        <input
          type="password"
          name="newPasword"
          value={password.newPasword}
          className="bg-red-300 text-gray-950 p-1 rounded"
          onChange={handleChange}
        />
      </div>
      <div className="grid p-1 text-white gap-1 ">
        <label htmlFor="new-pass">Confirm New Password :</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={password.confirmNewPassword}
          className="bg-red-300 text-gray-950 p-1 rounded"
          onChange={handleChange}
        />
      </div>

      <button className="text-lg bg-teal-100 font-semibold hover:text-blue-900 hover:bg-slate-100 mx-40 rounded-lg p-1 mt-4">
        RESET
      </button>
    </form>
  );
};

export default ResetPassword;
