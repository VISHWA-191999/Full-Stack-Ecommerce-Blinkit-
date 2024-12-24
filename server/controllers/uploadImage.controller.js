import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

const uploadImage =async(req,res)=>{
    try {
       const file= req.file
       console.log(file)
       const imageUpload=await uploadImageCloudinary(file)
      if(imageUpload){
        return res.json({
            message:'image uploaded',
            error:false,
            success:true,
            data:imageUpload
           })
      }
      else{
        return res.json({
            message:error||'image not uploaded',
            error:true,
            success:false
        })
      }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
export default uploadImage