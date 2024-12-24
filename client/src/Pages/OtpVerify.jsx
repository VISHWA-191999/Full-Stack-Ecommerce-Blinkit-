import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../config/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  console.log(otp.join(""));

  const validOTP = otp.every(el => el)
  const navigate =useNavigate();
 const location= useLocation();
//  console.log(location.state.email) // here we will get the email which have sent from OTP verification
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    // navigate("/reset-pass" , {state : { email:location.state.email , otp:otp.join("")} })

   try {
    const response= await Axios({
      ...SummaryApi.forgot_pass_otp_verification,
      data: {
        otp:otp.join(""),
        email:location?.state?.email
      }
    })
    if(response.data.error) {
      toast.error(response.data.message)
    }
    if (response.data.success) {
      toast.success(response.data.message)

      setOtp(["", "", "", "", "", ""])
      navigate("/reset-pass" , {state : {data:response.data , email:location?.state?.email} })
    }
   }
   catch(error) {
    AxiosToastError(error)
   }


  }
  return (
    <form
    onSubmit={handleOTPVerification}
     
      className="flex  flex-col justify-between p-3 rounded-xl mx-auto bg-blue-300 w-[40%] mt-9 h-[300px]  "
    >
      <h1 className="text-2xl font-semibold mb-2 text-center">Enter OTP</h1>
      <div className=" flex gap-2 items-center justify-center my-7 ">
        {otp.map((ele, index) => {
          console.log(ele);
          return (
            <input
              type="text"
              maxLength={1}
              className="bg-yellow-200 h-9 w-10 text-center hover:animate-bounce border-2 hover:border-teal-500"
              onChange={(e) => {
                const newOtp = [...otp];        // Create a copy of the otp array
                newOtp[index] = e.target.value; // Update the specific element
                setOtp(newOtp);                 // Set the updated array
              }}
              value={ele}    />
          );
        })}
      </div>

      <button disabled={!validOTP} className="inline bg-yellow-100 hover:bg-blue-900 hover:text-white">
        Verify OTP
      </button>
    </form>
  );
};

export default OtpVerify;
