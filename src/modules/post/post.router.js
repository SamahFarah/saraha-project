import { Router } from "express";
const router=Router();
import * as postController from './post.controller.js';
import { auth } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";



router.post('/',auth,fileUpload().single('image'),asyncHandler(postController.createPost));


export default router;