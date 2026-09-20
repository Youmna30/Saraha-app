import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport( {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }

} );

export async function sendEmail( to, subject, html ) {


    await transporter.sendMail( {
        from: `"Saraha-app" <${ process.env.USER_EMAIL }>`,
        to: to,
        subject: subject,
        html: html
    } )
}