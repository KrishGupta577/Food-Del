import { JsonWebTokenError } from "jsonwebtoken";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async(req,res) => {
    
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

        
    }
    catch(error){

    }
}

export {loginUser,registerUser}