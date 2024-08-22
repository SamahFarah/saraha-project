import { Router } from "express";
const router=Router();
import * as authController from './auth.controller.js';
import validation from "../../Middleware/validation.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { auth } from "../../Middleware/auth.js";


router.post('/register',validation(registerSchema),authController.Register) 
router.post('/login',validation(loginSchema),authController.Login) 
router.get('/allUsers',authController.allUsers);



export default router;