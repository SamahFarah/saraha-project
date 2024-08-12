import { Schema,model } from 'mongoose';


const userSchema = new Schema({
userName :{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},
age:{
    type:Number,
},
confirmEmail:{
    type:Boolean,
default:false,
},
gender:{  //male or : female .fe male . Female . fe_male... there is alot of ways to write it so : put enum
type:String,
enum :['Male','Female']
}
},{
    timestamps:true
});

const userModel= model('User',userSchema);
export default userModel;