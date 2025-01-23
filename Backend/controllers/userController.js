import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async(req,res) => {
    
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async(req,res) => {
    const {name,password,email} = req.body
    try{
        // checking if user already exists
        const exists = userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length < 8 ){
            return res.json({success:false,message:"Password must be of atleat 8 characters"})   
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

        
    }
    catch(error){

    }
}

export {loginUser,registerUser}