import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

import sendEmail from '../config/sendEmail.js'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import accessTokenGenerate from '../utils/accessTokenGenerate.js'
import refreshTokenGenerate from '../utils/refreshTokenGenerate.js'
import cloudinaryAvatarUpload from '../utils/cloudinaryAvatarUpload.js'
import generateOtp from '../utils/generateOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import jwt from 'jsonwebtoken'

// console.log(UserModel)

async function registerUser (req,res) {

    try {
        debugger
        const {name , email ,password} = req.body

        if(name && email && password) {
           const user=await UserModel.findOne({email})
            if(user){
                return res.json({
                    message : 'user already exist',
                    error:true,
                    success:false
                })
            }
            else {
                const salt =await bcryptjs.genSalt(10)
                const hashPassword = await bcryptjs.hash(password,salt)

                const payload ={
                    name,
                    email,
                    password:hashPassword
                }

                const newUser = new UserModel(payload)
                const save=await newUser.save()
                // const url = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
                const url = ""

                const verifyEmail=await sendEmail({sendTo:email,subject:'verify email',htmlTemplate:verifyEmailTemplate(name,url)})

                return res.json({
                    message:"User registered successfully",
                    error:false,
                    success:true,
                    data:save
                })

            }
        }

        else {
            return res.status(400).json({
                message:'Provide email , name and password',
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

export default registerUser

export async function verifyEmail (request ,response) {
    try {
        const {code} = request.body //code => userid
        const user =await UserModel.findOne(code)
        if(user){
           await UserModel.updateOne({_id:code},{verify_email:true})
           return response.json({
            message:'email verified successfully',
            error:false,
            success:true
           })
        }
        else{
            return response.json({
                message:"email not verified",
                error:true,
                success:false
            })
        }


        
    } catch (error) {
        return response.error(500).json({
            message:error.message || error,
            error:true,
            success:false
               })
        
    }
}

export async function loginController(req,res){
    try {
        
        console.log("inside login controller",req.body)

        const {email,password} =req.body
        if(email !=null && password!=null ) {
        const user = await UserModel.findOne({email})
        if(user){
            if(user.status ==="Active" ){
                const pass=user.password
                const checkPass=await bcryptjs.compare(password,pass)
                if(checkPass){
                    const accessToken = await accessTokenGenerate(user._id)
                    const refreshToken = await refreshTokenGenerate(user._id)

                    const cookieOption={
                        httpOnly:true,
                        secure:true,
                        sameSite:'none'
                    }

                    res.cookie('accessToken',accessToken,cookieOption)
                    res.cookie('refreshToken',refreshToken,cookieOption)
                    
                    return res.json({
                        message:'logged in successfull',
                        error:false,
                        success:true,
                        data:{
                            accessToken,refreshToken
                        }
                    })

                }
                else{
                    return res.status(400).json({
                        message:"Password is incorrect",
                        error:true,
                        success:false
                    })
                }
            }
            else{
                return res.json({
                    message:"user status is not Active",
                    error:true,
                    success:false
                })
            }
        }
        else{
            return res.json({
                message:"User has not registered with the given email ",
                error:true,
                success:false
            })
        }
    }
    else{
        return res.json({
            message:'please provide the fields',
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

export async function logOutController(req,res){
    try {
        
        console.log("inside logout controller")
        const userid = req.userId //middleware
        console.log(userid)
        const cookieOption={
            httpOnly:true,
            secure:true,
            sameSite:'none'
        }
        res.clearCookie('accessToken',cookieOption)
        res.clearCookie('refreshToken',cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        return res.json({
            message:'logout successfully',
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export async  function uploadAvatar(request,response){
    try {
        const userId = request.userId //get from auth middlware
        const image = request.file  //get from multer middleware

        const upload = await cloudinaryAvatarUpload(image)
        
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "upload profile",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update user details
export async function updateUserDetails(request,response){
    try {
        const userId = request.userId //auth middleware
        const { name, email, mobile, password } = request.body 

        let hashPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId},{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : hashPassword })
        })

        return response.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function forgotPasswordController(req,res){

    try {
        console.log("inside forgot password controller from user.controller")
        const {email} = req.body
        // console.log(email)
        const user=await UserModel.findOne({email})
        // console.log(user.email)
        if(!user){
            return res.status(400).json({
                message:'email is not exist ',
                error:true,
                success:false
            })

        }
        const otp=generateOtp()
        const expireOTP=new Date()+60*60*1000 //1hr
        
      await UserModel.updateOne({email},{
        forgot_password_otp:otp,
        forgot_password_expiry:new Date(expireOTP).toISOString()

      })
        //send email
        const data=await sendEmail({
            sendTo:email,
            subject:"Forgot password",
            htmlTemplate:forgotPasswordTemplate({name:user.name , otp:otp})
        })
        // console.log(data)
        if(data){
            return res.json({
                message:'OTP has been sent ur registered email',
                error:false,
                success:true
            })
        }
        else{
            return res.status(422).json({
                message:'something went wrong'
                
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

export async function verifyForgotPasswordOtp(req,res){
    try {
        const {email , otp} =req.body

        const user = await UserModel.findOne({email:email})
        if(user){
           const date = new Date()
            if(user.forgot_password_expiry < date) {
                const dbOtp = user.forgot_password_otp
                // console.log(otp)
                if(dbOtp===otp){

                    return res.json({
                        message:'OTP verified Successfully',
                        error:false,
                        success:true
                    })

            }
            else{
                return res.json({
                    message:'invalid OTP',
                    error:true,
                    success:false
                })
            }



            }
            else{
                return res.json({
                    message:' OTP has expired',
                    error:true,
                    success:false
                })
            }

        }
        else{
            return res.json({
                message:'Email is not available ',
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

export async function resetPassword(req,res){
    try {
        const{email , password,confirmPassword} = req.body

        if(email && password && confirmPassword){

           const user=await UserModel.findOne({email:email})

           if(user) {
            const salt =await bcryptjs.genSalt(10)
            const hashPassword=await bcryptjs.hash(password,salt)
          
           const passwordUpdate= await UserModel.updateOne({email},{
           
                password:hashPassword
            })
            if(passwordUpdate){
                return res.json({
                    message:'password reset successfully',
                    error:false,
                    success:true
                })
            }
            else{
                return res.json({
                    message:error.message || 'error while reseting password',
                    error:true,
                    success:false
                })
            }

           }
           else{
            return res.json({
                message:'user is not exist with the given email',
                error:true,
                success:false
            })
           }

        }
        else{
            return res.json({
                message:'please provide required fields',
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


//refresh token controler
export async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await accessTokenGenerate(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
// get logged in user details
export async function userDetails(request,response){
    try {
        
        console.log("inside userDetails controller from user.controller")
        const userId  = request.userId

        console.log(userId)

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : "Something is wrong",
            error : true,
            success : false
        })
    }
}