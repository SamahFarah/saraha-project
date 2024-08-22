import { Router } from "express";
const router=Router();
import * as messageController from './message.controller.js';
import validation from "../../Middleware/validation.js";
import { sendMessageSchema } from "./message.validation.js";
import { auth } from "../../Middleware/auth.js";


router.post('/:receiverId',validation(sendMessageSchema),messageController.sendMessage);
router.get('/',auth,messageController.getMessage);



export default router;