import bcrypt from "bcryptjs";
import { Users } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateToken from "../utils/generateToken.js";
import { jwtDecode } from "jwt-decode";
dotenv.config();

const SignUp = async (req, res) => {
  const { UserName, Name, Email, Phone, Password } = req.body;

  console.log(req.body);
  try {
    const user = await Users.findOne({ Email: Email });
    if (user) {
      res.json(`User already exists as ${user.userRole} ... Please Login `);
    } else {
      const hasedpassword = await bcrypt.hash(Password, 10);
      const user = await Users.create({
        UserName: UserName,
        Email: Email,
        profileInfo: {
          Name: Name,
        },
        Phone: Phone,
        password: hasedpassword,
      });
      if (user) {
        res.json({
          message: "User registered Succesfully",
          token: generateToken(user),
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

const SignUpOfficials = async (req, res) => {
  const {
    UserName,
    Name,
    Email,
    Phone,
    Password,
    Liscensenumber,
    AssignedCourt,
    userRole,
  } = req.body;

  console.log(req.body);
  try {
    const user = await Users.findOne({ Email: Email });
    if (user) {
      res.json(`User already exists as ${user.userRole} ... Please Login `);
    } else {
      const hasedpassword = await bcrypt.hash(Password, 10);
      const hashedLiscensenumber = await bcrypt.hash(Liscensenumber, 5);
      const user = await Users.create({
        Email: Email,
        UserName: UserName,
        Phone: Phone,
        password: hasedpassword,
        profileInfo: {
          Name: Name,
          LiscenseNumber: hashedLiscensenumber,
          AssignedCourt: AssignedCourt,
        },
        userRole: userRole,
      });
      if (user) {
        res.json({
          message: `${userRole} is signedUp Successfuly`,
          token: generateToken(user),
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

const login = async (req, res) => {
  const { Email, Password, userRole } = req.body;
  console.log(req.body);

  try {
    const user = await Users.findOne({ Email: Email });
    if (user) {
      if (user.userRole === userRole) {
        const isMacth = await bcrypt.compare(Password, user.password);
        if (isMacth) {
          // const token=jwt.sign({id:user._id , role: user.userRole},process.env.JWT_SECRET,{expiresIn : "1h"})
          // res.status(200).json({token})
          const decode=jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzhlM2YyOWNmZmUyMDg3NGMzMzNiYSIsIm5hbWUiOiJSdWRyYTc2NSIsImVtYWlsIjoicnVkcmFAZ21haWwuY29tIiwidXNlclJvbGUiOiJKdWRnZSIsImlhdCI6MTczMTg0Njc0NywiZXhwIjoxNzMxOTMzMTQ3fQ.HbxN-AQjnBLPnQWhC_uR2F-uRcJOMb3n_rfjXHeHGL0")
          console.log("Nmae : ",decode.name)
          console.log("email : ",decode.email)
          console.log("role : ",decode.userRole)
          res.json({ message: "Success", token: generateToken(user)  });
        } else {
          res.json("Password Incorrect ");
        }
      } else {
        res.json(`invalid Credentials , You are not ${userRole}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export default { SignUp, SignUpOfficials, login };
