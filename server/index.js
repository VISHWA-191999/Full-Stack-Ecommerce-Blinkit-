console.log("welcome to backend")
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import UserRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.route.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
dotenv.config() // {parsed: { FRONTEND_URL: '5173' } } 


const app=express()
// console.log(process)
// const allowedOrigins = ['https://full-stack-ecommerce-blinkit-fk6b-kvqk7u6om.vercel.app'];
const allowedOrigins="https://full-stack-ecommerce-blinkit-fe-vishwa.vercel.app"
app.use(cors({
    credentials:true,
    origin:process.env.fRONTEND_URL || allowedOrigins // process it's a object 
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false //incase our FE and BE runs on different domain
}))

const PORT =8080 || process.env.PORT
app.get('/',(req,res)=>{
    // console.log(req)
    res.send('hiii')
})


connectDB();

app.use('/api/user',UserRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/subcategory',subCategoryRouter)
app.use('/api/product',productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

app.listen(PORT , ()=>{
    console.log(`server is running , ${PORT}`)
})