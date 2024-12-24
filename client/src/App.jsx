import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import SummaryApi from './config/SummaryApi';
import AxiosToastError from './utils/AxiosToastError';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Axios from './utils/Axios';
import GlobalProvider from './provider/GlobalProvider';
import CartMobileLink from './components/CartMobile';


function App() {

  const dispatch =useDispatch()
  const location = useLocation()
 
  const fetchUser = async () => {
    const userData= await fetchUserDetails();

    console.log('userData' , userData)
  }

  const fetchCategory=async ()=>{
    try {
      dispatch(setLoadingCategory(true))
      const response=await Axios({
        ...SummaryApi.getCategory
      })
    
      const {data :responseData}=response
      console.log("category data",responseData.data)
      dispatch(setAllCategory(responseData.data))
      
     
    } catch (error) {
      AxiosToastError(error)
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response
        console.log("data subcategory",responseData)
        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
       const data= useSelector(state => state.product.getSubCategory)
       console.log(data)
    } catch (error) {
        console.log(error)
    }finally{
    }
  }

  useEffect (()=> {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])

  return (
    <GlobalProvider>
    <Header/>
   <main className='min-h-[73vh]'>
   <Outlet/>
   </main>
    <Footer/>
    <Toaster />
    <CartMobileLink/>
    </GlobalProvider>
  )
}

export default App;
