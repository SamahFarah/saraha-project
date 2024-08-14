import { Router } from "express";
const router=Router();
import * as authController from './auth.controller.js';
import validation from "../../Middleware/validation.js";
import { loginSchema, registerSchema } from "./auth.validation.js";


router.post('/register',validation(registerSchema),authController.Register) 
router.post('/login',validation(loginSchema),authController.Login) 




export default router;