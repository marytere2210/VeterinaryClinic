 import nodemailer, {Transporter} from "nodemailer";
 
 export interface SendEmailOptions{
    to: string | string[];
    subject: string;
    html: string;
    attachments?: Attachment[];
 }

 interface Attachment{
    filename: string;
    path: string;
    
 }

 export class EmailService{
    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailEmail: string,
        mailPassword: string,
        private readonly postToProvider: boolean
        
    ){ 
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailEmail,
                pass: mailPassword,
            },
        });
        
    }
    async sendEmail(options: SendEmailOptions){
 const {to, subject, html, attachments=[]} = options;
 
  try {

    await this.transporter.sendMail({
        to:to,
        subject: subject,
        html: html,
      //  attachments: attachments,
    });
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }
    }
}

