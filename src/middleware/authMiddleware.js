// so we can attach the method to verify the token and get back the content from token.
import jwt from "jsonwebtoken"
import { userModel } from "../models/userSchema.js"
//dotenv is where our secret is stored
import dotenv from "dotenv"
dotenv.config()

// const secret is must needed to verify token. It is also called JWT secret key
const secret = process.env.SECRET_KEY

// token is must needed to verify user authentication. const token here means that JWT token which is stored in cookie.    
export const checkAuth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(404).json({
            message: "Token not found!"
        })
    }

    try {
        // verify token and check user is exist or not.
        const decodedToken = jwt.verify(token, secret)

        const user = await userModel.findById(decodedToken.id)

        // if user does not exist, return error.    
        if (!user) {
            return res.status(404).json({
                message: `User with id:${decodedToken.id} does not exist!`
            })
        }

        req.user = user

        next()
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}