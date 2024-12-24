import { Router } from "express";
import auth from "../middleware/auth.js";
import { addCategory, deleteCategory, getCategoryController, updateCategory } from "../controllers/category.controller.js";

const categoryRouter= Router();
categoryRouter.post('/addCategory',auth,addCategory)
categoryRouter.get('/get',getCategoryController)
categoryRouter.put('/updateCategory',auth,updateCategory)
categoryRouter.delete('/deleteCategory',auth,deleteCategory)

export default categoryRouter