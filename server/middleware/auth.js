import jwt from "jsonwebtoken"

const auth =async (req,res,next) =>{
try {
    console.log("inside middleware->auth.js",req.body)
    // const token = req.cookies.accessToken || req?.headers?.authorization?.split(' ')[1]
    console.log(req.cookies.accessToken )
    const token = req.cookies.accessToken 
    console.log(token)
    if(!token){
        return response.status(401).json({
            message : "Provide token"
        })
    }

    // const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)
    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if(!decode){
        return response.status(401).json({
            message : "unauthorized access",
            error : true,
            success : false
        })
    }
    console.log(decode)
    console.log(decode.id)
    req.userId = decode.id

    next();

} catch (error) {
    return res.status(500).json({
        message:"Please Login !",
        error:true,
        success:false
    })
}

}

export default auth