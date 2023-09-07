// importing modules
import bcrypt from "bcrypt";
import db from "../models";
import { Jwt } from "jsonwebtoken";
import { Crypto } from "crypto";
import { sendingMail } from "../nodemailer/mailing";

// Assigning users to the variable User
const User = db.users;
const Token = db.tokens;

// signing a user up
// hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { userName, email, password, isVerified } = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10),
            isVerified,
        };

        // saving the user
        const user = await User.create(data);

        // if user details is captured
        // created a token with crypto.js
        if(user) {
            let setToken = await Token.create({
                userId: user.id,
                token: crypto.randomBytes(16).toString("hex"),
            });

            // if token is created, send the user a mail
            if(setToken) {
                // send email to the user
                // with the function coming from the mailing.js file
                // message containing the user id and
                sendingMail({
                    from: "no-reply@example.com",
                    to: `${email}`,
                    subject: "Account Verification Link",
                    text: `Hello, ${userName}. Please verify your email by clicking this link:
                            `
                })
            }
        }
    }
}