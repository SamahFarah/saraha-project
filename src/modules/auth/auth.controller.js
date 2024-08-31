import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../Utils/sendEmail.js";
import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";


export const Register = async (req,res,next)=>{

    
        
        const {userName,email,password,cpassword,gender,age}=req.body;
        const user= await userModel.findOne({email});
    if(user){
        //return res.status(409).json({message:"email exist"})
        return next(new AppError('email exist',409));

    }
        
    const passwordHashed= await bcrypt.hash(password,parseInt(process.env.SALTROUND))
    const html = `
    <div>
        <p style="color: #555; font-size: 16px;"> Dear: ${userName} </p>
        <h1 style="color: #4A90E2; font-size: 32px;">Welcome to Saraha!</h1>
        <p style="color: #555; font-size: 16px;">Thank you for registering with us. We wish you a great experience.</p>
    </div>
`

       sendEmail(email,"Welcom! ✔ ",html)
       await userModel.create({userName,email,password:passwordHashed,cpassword,gender,age});
   
        return res.status(201).json({message:"success"})
        
    }



    export const Login = async(req,res,next)=>{
        

        
        const {email,password}=req.body;
        
       
        const user= await userModel.findOne({email});
        if(!user){
           // return res.status(404).json({message:"email not found"})
           return next(new AppError('email not found',404));
        }
        const match =  bcrypt.compareSync(password,user.password);
        if(!match){
           // return res.status(404).json({message:"invalid password"})
           return next(new AppError('invalid password',409));


     
        }
        const token= jwt.sign(
            {id:user._id},process.env.LOGINTOKEN,
            {expiresIn:'1h'}
        );
        return res.status(200).json({message:"success",token})
    
}

    export const allUsers= async(req,res)=>{
        
            const users = await userModel.find().select('userName');
            return res.status(200).json({message:"success",users});
    }
    
    export const uploadImage= async(req,res)=>{
        const {secure_url}= await cloudinary.uploader.upload(req.file.path);

const user= await userModel.findByIdAndUpdate(req.id,{profilePic:secure_url})

        return res.status(200).json({message:"success"});
    }