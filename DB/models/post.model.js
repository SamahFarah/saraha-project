import { Schema,model,Types } from 'mongoose';


const postSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
        body: {
        type:String,
        required: true,
        },
        image: {
        type:String,
        },
        userId: {
        type: Types.ObjectId,
        ref: 'User',
        required:true,
        },
        like: [{
        type: Types.ObjectId,
        ref: 'User'
        }],
        unlike: [{
        type: Types.ObjectId,
        ref: 'User'
        }],
},{
    timestamps:true
});

const postModel= model('Post',postSchema);
export default postModel;