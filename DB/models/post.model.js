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
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
});
postSchema.virtual("comment",{
    ref:"Comment",
    foreignField: 'postId',
    localField:'_id'
})

const postModel= model('Post',postSchema);
export default postModel;