import nodemailer from "nodemailer";



export async function sendEmail (to,subject,html){
    const transporter = nodemailer.createTransport({
       service:"gmail",
        auth: {
          user: process.env.EMAILSENDER,
          pass: process.env.PASSWORDSENDER,
        },
      });
      const info = await transporter.sendMail({
        from: `saraha website 👻" <${process.env.EMAILSENDER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        
        html,
      });
}