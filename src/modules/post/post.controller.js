import postModel from "../../../DB/models/post.model.js";
import cloudinary from "../../Utils/cloudinary.js";

export const createPost= async(req,res)=>{
    const userId=req.id;
     const {title,body}=req.body;
     const {secure_url}=await cloudinary.uploader.upload(req.file.path);
     const post= await postModel.create ({title,body,userId,image:secure_url});
     return res.status(201).json({message:"success"});
}