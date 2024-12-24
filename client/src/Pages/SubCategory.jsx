import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import Axios from "../utils/Axios";
import SummaryApi from "../config/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import toast from "react-hot-toast";
import ConfirmBox from "../components/ConfirmBox";

const SubCategory = () => {
  const [openSubCatModel, setOpenSubCatModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();

  console.log("column helper", columnHelper);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      console.log("response sub-category data", response);

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  //making table structure using ten stack table library

  const column = [
    columnHelper.accessor("name", {
      // name field same as coming from backend
      header: "Name", // table head cell name
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        //row is key from the cell
        // console.log(row.original.image) // we get the url of image from row object

        const [viewImage, setViewImage] = useState(false); // to store image url

        return (
          <div className="flex items-center justify-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8"
              onClick={() => {
                console.log("clicked", row.original.image);
                setViewImage(true);
              }}
            />

            {viewImage && (
              <ViewImage
                url={row.original.image}
                close={() => setViewImage(false)}
              />
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
              className="p-2 bg-green-100 rounded-full hover:text-green-600"
            >
              <HiPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmBox(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="shadow-md flex items-center justify-between p-1 rounded    ">
        <h3 className="font-semibold text-lg">Sub-Category</h3>
        <button
          onClick={() => {
            console.log("clicked");

            setOpenSubCatModel((prev) => !prev);
          }}
          className="border-black border px-2 py-1 rounded hover:bg-yellow-300 hover:border-green-200 bg-yellow-100 text-sm"
        >
          Add Sub-Category
        </button>
      </div>
      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={data} column={column} />
      </div>
      {openSubCatModel && (
        <UploadSubCategoryModel
          close={() => setOpenSubCatModel(false)}
          fetchData={fetchSubCategory}
        />
      )}
      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}
      {openDeleteConfirmBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
