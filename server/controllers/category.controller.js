import CategoryModel from '../models/category.model.js'

console.log(CategoryModel)

//to add category
export const addCategory = async (req,res)=>{
    try {
        console.log("inside category controller , addCategory")

        const {name , image} = req.body

        if(name && image) {
            const addCategory=new CategoryModel({name ,image})

            const saveCategory=await addCategory.save()

            if(saveCategory){
                return res.json({
                    message:"category added successfully",
                    error:false,
                    success:true
                })

            }
            else{
                return res.json({
                    message:error||'something went wrong while adding category',
                    error:true,
                    success:false
                })
            }


        }
        else{
            return res.json({
                message:"Provide required fields i.e category name and image",
                error:true,
                success:false
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export const getCategoryController = async(request,response)=>{
    try {
        
        const data = await CategoryModel.find().sort({ createdAt : -1 })

        return response.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.messsage || error,
            error : true,
            success : false
        })
    }
}

export const updateCategory = async (req,res) => {
    try {
        console.log("inside category controller i.e updateCategory")
        const {categoryId , name , image} = req.body

      const updated=await  CategoryModel.updateOne({
            _id:categoryId
        },
    {
        name,
        image  
    })
        if(updated){
            return res.json({
                message:'category updated successfully',
                error:false,
                success:true,
                data:updated
            })
        }
        else{
            return res.json({
                message:error||'something went wrong i.e not updated',
                error:true,
                success:false,
                data:updated
            })
        }
    } catch (error) {

        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
        
    }
}

export const deleteCategory = async(req,res)=> {
    try {
        console.log("inside delete category controller")
        const {deleteId} = req.body
        console.log(deleteId)
        console.log(req.body)
       
       const deleted=await CategoryModel.deleteOne({
            _id:deleteId
        })

        if(deleted){
            return res.json({
                message:'category deleted',
                error:false,
                success:true
            })
        }
        else{
            return res.json({
                message:error || 'something went wrong',
                error:true,
                success:false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message ||error,
            error:true,
            success:false
        })
    }

}

