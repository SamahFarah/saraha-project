import { Router } from "express";
const router=Router();
import * as authController from './auth.controller.js';


router.post('/register',authController.Register) 
router.post('/login',authController.Login) 




export default router;