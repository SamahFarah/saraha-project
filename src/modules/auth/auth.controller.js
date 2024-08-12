import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const Register = async (req,res)=>{

    try{
        
        const {userName,email,password,cpassword,gender}=req.body;
        const user= await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email exist"})
    }
        
    const passwordHashed= await bcrypt.hash(password,parseInt(process.env.SALTROUND))
       
       await userModel.create({userName,email,password:passwordHashed,cpassword,gender});
   
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
    