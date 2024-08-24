import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';
import { AppError } from "../../../AppError.js";

export const sendMessage= async (req,res,next)=>{
    
        const {message}=req.body;
        const {receiverId}= req.params;
        const user= await userModel.findById(receiverId);
        if(!user){
           //return res.status(404).json ({message:"User not found"});
           return next(new AppError('User not found',404));

        }
        await messageModel.create({message,receiverId})
       
           return res.status(201).json({message:"success"});
       

    }
 
export const getMessage= async (req,res)=>{

            const messages = await messageModel.find({receiverId: req.id});
            return res.status(200).json({message: "success", messages});
        

}