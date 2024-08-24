import { Router } from "express";
const router=Router();
import * as messageController from './message.controller.js';
import validation from "../../Middleware/validation.js";
import { sendMessageSchema } from "./message.validation.js";
import { auth } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";


router.post('/:receiverId',validation(sendMessageSchema),asyncHandler(messageController.sendMessage));
router.get('/',auth,asyncHandler(messageController.getMessage));



export default router;