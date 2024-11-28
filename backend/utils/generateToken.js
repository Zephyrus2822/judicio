import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken=(user)=>{
    return jwt.sign(
        {
            id:user._id,
            name:user.UserName,
            email:user.Email,
            userRole:user.userRole
        },
        process.env.JWT_SECRET,
        {expiresIn:"24h"}
    )
}

export default generateToken