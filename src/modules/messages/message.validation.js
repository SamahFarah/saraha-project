import joi from 'joi';
export const sendMessageSchema={
body: joi.object({
    message:joi.string().min(2).max(200).required(),
}),
params:joi.object({
    receiverId:joi.string().length(24)
})
}
