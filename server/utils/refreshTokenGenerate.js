import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'
import dotenv from 'dotenv'
dotenv.config()
const refreshTokenGenerate =async (userId)=>{
  
 const token=await jwt.sign({id:userId},process.env.SECRET_KEY_REFRESH_TOKEN,{expiresIn:'5d'})

 const updateToken = await UserModel.updateOne({_id:userId} , {refresh_token:token})

return token
}
export default refreshTokenGenerate