import axios from "axios";

import SummaryApi, { BASE_URl } from "../config/SummaryApi";

const Axios = axios.create({
  baseURL: BASE_URl,
  withCredentials: true, // we are using it so store data as cookies
});
//sending access token in the header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accesstoken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//If accessToken get expired 
Axios.interceptors.response.use( (response)=>{
  return response
},async (error) => {
  let originRequest = error.config;
console.log(error)
  if (error.response.status === 401 && !originRequest.retry) {
    originRequest.retry = true;

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {

        const newAccessToken= await refreshAccessToken(refreshToken) // we get new Access token

        if(newAccessToken) {
            originRequest.headers.Authorization=`Bearer ${newAccessToken}`
         return Axios(originRequest)
        }
    }   
  }
  return Promise.reject(error)
});
//send request to backend for regeneration access token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = Axios({
      ...SummaryApi.refreshToken,
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    const accessToken=response.data.data.accessToken
    localStorage.setItem('accesstoken',accessToken)
    return accessToken 
  } catch (error) {
    console.log(error)
  }
};



export default Axios;
