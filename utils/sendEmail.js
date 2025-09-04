import nodeMailer from "nodemailer"; // Importing nodemailer for sending emails


export const sendEmail = async({email, subject, message}) => {  //iss function ka use email send krne ke liye hota hai
   const transporter = nodeMailer.createTransport({       //aur isme hum host,service ,port ka work hota hai ki wo email send kr sake
        // host: "smtp.mailtrap.io", // SMTP host
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },

   });

    const optons = {
        from: process.env.SMTP_mail,
        to: email,
        subject: subject,
        html: message,
    };
    await transporter.sendMail(optons);  // Send the email using the transporter
    console.log("Email sent successfully");

};