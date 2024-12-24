import { Router } from "express"
import registerUser, { forgotPasswordController, loginController, logOutController, refreshToken, resetPassword, updateUserDetails, uploadAvatar, userDetails, verifyEmail, verifyForgotPasswordOtp } from "../controllers/user.controller.js"
import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js"


const UserRouter = Router()

UserRouter.post('/register',registerUser)
UserRouter.post('/verify-email',verifyEmail)
UserRouter.post('/login',loginController)
UserRouter.get('/logout',auth,logOutController) 
UserRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
UserRouter.put('/update-user',auth,updateUserDetails)
UserRouter.put('/forgot-password',forgotPasswordController)
UserRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
UserRouter.put('/reset-password',resetPassword)
UserRouter.post('/refresh-token',refreshToken)
UserRouter.get('/user-details',auth,userDetails)
export default UserRouter;