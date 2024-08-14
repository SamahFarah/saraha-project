import joi from 'joi';
import { generalFeilds } from '../../Middleware/validation.js';
export const registerSchema = {
body:joi.object({
    userName: joi.string().min(4).max(10).required().messages({
        'string.empty':'userName is required',
        'string.max':'maximmum 10 letters of your userName'
    }),
    email:generalFeilds.email,
   
    password: generalFeilds.password,
    cpassword: joi.valid(joi.ref('password')).required().messages({
        'any.only':'cpassword is required same as password'
    }),
    age:joi.number().positive().integer().min(12).optional().messages({
      'number.min':'your age must be 12 or greater.'
    }),
    gender:joi.valid('Male','Female').messages({
        'any.only':'gender must be one of [Male, Female]'
    })

})

};
export const loginSchema ={
 body:joi.object({
    
    email:generalFeilds.email,
    password: generalFeilds.password
    

})
};