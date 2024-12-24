import { Resend } from "resend";
import dotenv from 'dotenv'
dotenv.config()
async function sendEmail ({sendTo ,subject,htmlTemplate}) {
    console.log(sendTo , htmlTemplate)
if(process.env.RESEND_API){
    console.log("inside sendemail ")
    const resend =new Resend(process.env.RESEND_API)

  
      try {
        const { data, error } = await resend.emails.send({
            from: 'binkeyit <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: htmlTemplate,
          });
          console.log("data",data)
          console.log("error",error)
          return true;
      } catch (error) {
        console.error( error );
      }
        
    }
    else {
        console.log('Resend api is not available')
    }
    
}

export default sendEmail;