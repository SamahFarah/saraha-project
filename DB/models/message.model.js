import { Schema,Types,model } from 'mongoose';


const messageSchema = new Schema({
message :{
    type:String,
    required:true,
},
    receiverId:{
type: Types.ObjectId,
required:true,
ref:'User',
    }

},{
    timestamps:true
});

const messageModel= model('Message',messageSchema);
export default messageModel;