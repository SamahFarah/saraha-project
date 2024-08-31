import postModel from "../../../DB/models/post.model.js";
import cloudinary from "../../Utils/cloudinary.js";
import { AppError } from "../../../AppError.js";
import commentModel from "../../../DB/models/comment.model.js";

export const createPost= async(req,res)=>{
    const userId=req.id;
     const {title,body}=req.body;
     const {secure_url}=await cloudinary.uploader.upload(req.file.path);
     const post= await postModel.create ({title,body,userId,image:secure_url});
     return res.status(201).json({message:"success"});
}

export const likePost = async (req, res,next)=>{
    const userId = req.id;
    const {id} = req.params;
    const post = await postModel.findByIdAndUpdate(id,{
    $addToSet: {
    like: userId
    }
},{
    new: true
});
    if(!post){
    return next(new AppError ("post not found", 404));
    }
    return res.status(201).json ({message: "success",post});
   
    }


    export const unlikePost = async (req, res,next)=>{
        const userId = req.id;
        const {id} = req.params;
        const post = await postModel.findByIdAndUpdate(id,{
        $pull: {
        like: userId
        }
    },{
        new: true
    });
        if(!post){
        return next(new AppError ("post not found", 404));
        }
        return res.status(201).json ({message: "success",post});
       
        }

        export const createComment = async (req, res, next) => {
            req.body.userId = req.id;
            req.body.postId = req.params.id;
        
            const post = await postModel.findById(req.body.postId);
            if (!post) {
                return next(new AppError("post not found", 404));
            }
        
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path);
                req.body.image = secure_url;
            }
        
            const comment = await commentModel.create(req.body);
            return res.status(201).json({ message: "success", comment });
        };
        