// importing modules
import nodemailer from "nodemailer";

// function to send email to the user
module.exports.sendingMail = async({from, to, subject, text}) => {
    try {
        let mailOptions = ({
            from,
            to,
            subject,
            text
        })
        
        // assign createTransport method in nodemailer to a variable
        // service: to determine which email platform to use
        // auth contains the senders email and password which are all saved in .env
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.email,
                pass: process.env.emailpassword,
            },
        });

        // return the Transporter variable which has the sendMail method to the send the mail
        // which is within the mailOptions
        return await Transporter.sendMail(mailOptions)
    } catch(err) {
        console.log(err);
    }
}