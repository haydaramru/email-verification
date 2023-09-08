// importing modules
import { Express } from "express";
import userController from "../controllers/userController"
import { signup, verifyEmail, login } from "userController"
import userAuth from "../middlewares/userAuth"

const router = Express.Router()

// signup endpoint
// passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

// login route
router.post("/login", login)

// email verification route
router.get("/verify-email/:id/:token", verifyEmail);

module.exports = router