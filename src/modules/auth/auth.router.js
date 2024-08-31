import { Router } from "express";
const router=Router();
import * as authController from './auth.controller.js';
import validation from "../../Middleware/validation.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { auth } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";


router.post('/register',validation(registerSchema), asyncHandler(authController.Register)) ;
router.post('/login',validation(loginSchema),asyncHandler(authController.Login));
router.get('/allUsers',asyncHandler(authController.allUsers));
router.put('/uploadImage',fileUpload().single('image'),auth,asyncHandler(authController.uploadImage));


export default router;