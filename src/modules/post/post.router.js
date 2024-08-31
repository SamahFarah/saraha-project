import { Router } from "express";
const router=Router();
import * as postController from './post.controller.js';
import { auth } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";



router.post('/',auth,fileUpload().single('image'),asyncHandler(postController.createPost));
router.patch('/like/:id',auth,asyncHandler(postController.likePost));
router.patch('/unlike/:id',auth,asyncHandler(postController.unlikePost));

//comment
router.post('/comment/:id',auth,fileUpload().single('image'),asyncHandler(postController.createComment))


export default router;