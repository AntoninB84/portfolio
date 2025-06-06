'use server';

const nodemailer = require('nodemailer');

export default async function mailSender({from, message}: {from: string, message: string}) {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: from,
        to: process.env.SMTP_TO,
        subject: "Portfolio - Contact form",
        text: message
    };

    try {
        await transporter.sendMail(mailOptions, (error: any, info: any) => {
            if(error) {
                return console.log(error);
            }
            console.log("Contact message sent: %s", info.messageId);
        });
    } catch (e) {
        console.log(e);
    }
    
    return true;
}