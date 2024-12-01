import bcrypt from "bcryptjs";
import { Users } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateToken from "../utils/generateToken.js";
import { jwtDecode } from "jwt-decode";
dotenv.config();

const SignUp = async (req, res) => {
  const { UserName, Name, Email, Phone, Password } = req.body;

  if(!UserName || !Name || !Email || !Phone || !Password){
    return res.status(400).json("Please fill all fields");
  }

  console.log(req.body);
  try {
    const user = await Users.findOne({ Email: Email }||{UserName:UserName}||{Phone:Phone});
    
    if (user ) {
      res.json(`User already exists as ${user.userRole} ... Please Login `);
    } 
    
    else {
      const hasedpassword = await bcrypt.hash(Password, 10);
      const user1 = await Users.create({
        UserName: UserName,
        Email: Email,
        profileInfo: {
          Name: Name,
        },
        Phone: Phone,
        password: hasedpassword,
      })
      if(user1){

        res.status(200).json({
          message: "UserCreated",
          token: generateToken(user1),
        })
      }
      else{
        res.json("Error in creating user");
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


  if(!UserName || !Name || !Email || !Phone || !Liscensenumber || !AssignedCourt || !Password || !userRole){
    res.status(400).json("Please fill all fields");
    return
  }
  console.log(req.body);
  try {
    const user = await Users.findOne({ Email: Email }||{Phone:Phone}|| {UserName:UserName});
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
  const { UserName, Password, userRole } = req.body;
  console.log(req.body);

  try {
    const user = await Users.findOne({ UserName: UserName });
    if (user) {
      if (user.userRole === userRole) {
        const isMatch = await bcrypt.compare(Password, user.password);
        if (isMatch) {
          
          res.json({ message: "Success", token: generateToken(user) });
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


const getUsers=async (req,res)=>{
  try {
    const users = await Users.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.json("Error fetching users");
  }
}

export default { SignUp, SignUpOfficials, login,getUsers };
