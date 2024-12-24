import SummaryApi from "../config/SummaryApi"
import Axios from "./Axios"

const uploadImage = async(image) =>{
    try {
        const formData= new FormData()
        formData.append('image',image)
       const response=await Axios({
            ...SummaryApi.uploadImage,
            data:formData
        })
        return response
    } catch (error) {
        return error || 'error while uploading the image from frontend uploadImage.js'
    }
}

export default uploadImage
