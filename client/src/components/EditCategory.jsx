import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../config/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const EditCategory = ({ close, fetchData ,data:categoryData }) => {
  const [data, setData] = useState({
    categoryId:categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });

  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadCategoryImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
        setLoading(true)
      const imageResponse = await uploadImage(file);
      console.log(imageResponse.data.data.url);
      setLoading(false)
      setData((prev) => {
        return { ...prev, image: imageResponse.data.data.url };
      });
    } else {
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
      });

      console.log(response);
      close();
      fetchData();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 p-3 bg-neutral-600 opacity-96 flex items-center justify-center ">
      <div className="bg-white w-full max-w-4xl p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Update Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoIosClose
              size={25}
              className="hover:bg-black hover:text-white rounded-full"
            />
          </button>
        </div>
        <form className="grid gap-3 my-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName"> Name : </label>
            <input
              type="text"
              placeholder="enter category name"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="border border-black p-2 rounded"
            />
          </div>

          <div className="grid gap-1">
            <p>image</p>
            <div className="h-28 w-28 bg-blue-300 flex items-center justify-center">
              {data.image ? (
                <img
                  className="h-full w-full"
                  src={data.image}
                  alt="categoryImage"
                />
              ) : (
                <p className="">No Image</p>
              )}
            </div>
            <label htmlFor="uploadImage" disabled={!data.name}>
              <div
                onClick={() => !data.name && alert("enter category name")}
                className={`inline ml-2 ${
                  data.name ? "bg-blue-700" : "bg-blue-300"
                } hover:text-yellow-200 hover:border-yellow-50 my-1  rounded p-1 text-sm  `}
              >
                {
                    loading ? "Loading..." : "Upload Image"
                }
              </div>
              <input
                onChange={handleUploadCategoryImage}
                disabled={!data.name}
                type="file"
                id="uploadImage"
                className="hidden"
              />
            </label>
          </div>
          <button
            className={`${
              data.name && data.image ? "bg-blue-700" : "bg-blue-300"
            } hover:text-yellow-200 hover:border-yellow-50 my-1  rounded p-1 text-sm  `}
          >
            Update Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
