import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import messageRouter from "./modules/messages/message.router.js"
const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/messages',messageRouter);
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});
    });
}
export default initApp;