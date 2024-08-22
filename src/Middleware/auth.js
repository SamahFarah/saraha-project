import jwt from 'jsonwebtoken';
export const auth= (req,res,next)=>{
    try{
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BERERTOKEN)){
            return res.status(400).json ({message: "invalid token"});
        }
        const token=authorization.split(process.env.BERERTOKEN)[1];
        const decoded = jwt.verify(token,process.env.LOGINTOKEN) ;
        if(!decoded) {
        return res.status(400).json ({message: "invalid token"});}
        req.id=decoded.id;
        next();
    }catch(error){
        return res.status(500).json({message: 'catch error', error:error.stack});
    }
   
}