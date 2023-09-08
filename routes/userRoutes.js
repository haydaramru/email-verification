// importing modules
import { Express } from "express";
import userController from "../controllers/userController"
import { signup, verifyEmail, login } from "userController"
import userAuth from "../middlewares/userAuth"

const router = Express.Router()

// signup endpoint
// passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);