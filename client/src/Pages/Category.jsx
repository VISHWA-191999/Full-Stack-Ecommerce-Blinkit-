import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../config/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useEffect } from 'react';
import EditCategory from '../components/EditCategory';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Category = () => {

    const [openCategoryModel , setOpenCategoryModel] = useState(false);
    const [loading ,setLoading] =useState(false)
    const [categoryData , setCategoryData] = useState([])
    const [openEditComponent , setOpenEditComponent] =useState(false)
    const [editData ,setEditData]=useState({
      name:'',
      image:''
    })

    const allCategory=useSelector((state)=>{
      // console.log(state)
      return state.product.allCategory})
      
      console.log("All Category Data",allCategory)
      console.log("categoryData",categoryData)
    useEffect(()=>{
      setCategoryData(allCategory)
    },[allCategory])
    // const [deleteId ,setDeleteId] =useState()
    // console.log( "deleteId",
    //   deleteId
    // )

    // we create this func in app.jsx file as it will get get data when the app starts and store into store i.e redux

    const fetchCategory=async ()=>{  
      try {
        setLoading(true)
        const response=await Axios({
          ...SummaryApi.getCategory
        })
        console.log(response)
        const {data :responseData}=response
        console.log("category data",responseData.data)
        setCategoryData(responseData.data)
      } catch (error) {
        AxiosToastError(error)
      }finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      fetchCategory()
    },[])

    const deleteCategory =async (deleteId)=>{
      try {
        // var deleteId;
        // console.log(deleteId)
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        console.log("confirmDelete",confirmDelete)
        if (confirmDelete) {
         // deleteCategory(deleteId); // Call the delete function
        
        const res=await Axios({
          ...SummaryApi.deleteCategory,
          data:{deleteId}
        })
        console.log(res)

        if(res.data.success){
          toast.success(res.data.message)
          fetchCategory()
        }
        else{
          toast.error(res.data.message)
        }
      }
      } catch (error) {
        AxiosToastError(error)
      }
    }
  return (
   <section className=''>
     <div className='shadow-md flex items-center justify-between p-1 rounded  '>
    <h3 className='font-semibold text-lg'>Category</h3>
    <button 
    onClick={()=>{
        console.log("clicked")

        setOpenCategoryModel((prev)=> !prev
           
        )
        }} className='border-black border px-2 py-1 rounded hover:bg-yellow-300 hover:border-green-200 bg-yellow-100 text-sm'>
        Add Category
    </button>
    </div>
    {
      loading && <Loading/>
    }
    {
      (!loading && !categoryData?.[0] ) && <NoData/>
    }
   
   <div className='grid md:grid-cols-3 grid-cols-2 lg:grid-cols-5 p-3 gap-3 overflow-y-auto lg:max-h-[400px]'>
    {
      categoryData.map((ele)=>{
        return (
          <div className=' w-28 h-48 group '>
            <img className='object-scale-downc' key={ele._id} src={ele.image} alt={ele.name} />
            <div className=' justify-between mx-1 gap-1  hidden group-hover:flex'>
              <button onClick={()=>{setOpenEditComponent(true) 
                setEditData(ele)}} className='bg-green-100 flex-1'>edit</button>
              <button onClick={()=> deleteCategory(ele._id)}  className='bg-red-100 flex-1'>delete</button>
            </div> 
          </div>
        )
      })
    }
   </div>
   
    {
        openCategoryModel && <UploadCategoryModel fetchData={fetchCategory} close={ ()=> setOpenCategoryModel((prev)=> !prev)}/>
    }

    {
      openEditComponent && <EditCategory data={editData} fetchData={fetchCategory} close={()=>setOpenEditComponent(false)}/>
    }
   
   </section>
  )
}

export default Category
