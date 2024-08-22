import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../Utils/sendEmail.js";


export const Register = async (req,res)=>{

    try{
        
        const {userName,email,password,cpassword,gender,age}=req.body;
        const user= await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email exist"})
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
        }catch(err){
            return res.status(500).json({messsag:"catch error",error:err.stack})
        }
    }



    export const Login = async(req,res)=>{
        const {email,password}=req.body;
        
       
        const user= await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message:"email not found"})
        }
        const match =  bcrypt.compareSync(password,user.password);
        if(!match){
            return res.status(404).json({message:"invalid password"})
     
        }
        const token= jwt.sign(
            {id:user._id},process.env.LOGINTOKEN,
            {expiresIn:'1h'}
        );
        return res.status(200).json({message:"success",token})
    }

    export const allUsers= async(req,res)=>{
        try{
            const users = await userModel.find().select('userName');
            return res.status(200).json({message:"success",users});
        }catch(error){
            return res.status(500).json({message:"catch error",error:error.stack});
        }
    }
    