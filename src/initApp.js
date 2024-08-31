import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import messageRouter from "./modules/messages/message.router.js"
import postRouter from "./modules/post/post.router.js"

const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/messages',messageRouter);
    app.use('/post',postRouter);
    app.use('*',(req,res,next)=>{
        //return res.status(404).json({message:"page not found"});
        return next(new Error(`page not found`));
    });

    app.use( (err,req,res,next)=>{
          return res.status(err.statusCode).json({message:err.message});
    });
    
}
export default initApp;