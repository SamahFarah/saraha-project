import { Router } from "express";
const router=Router();
import * as authController from './auth.controller.js';


router.post('/',authController.Register) 



export default router;