const UserModel = require("../Models/userschema");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  signupvalidation,
  loginvalidation,
} = require("../Validation/uservalidation");

const JWT_SECRET = process.env.JWT_SECRET;

const createuser = async (req, res) => {
  const { value, error } = signupvalidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { name, email, password } = req.body;
    const exist = await UserModel.findOne({ email: email });
    if (exist) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newuser = await new UserModel({
      name,
      email,
      password: hash,
    });

    await newuser.save();
    return res.status(201).json({
      message: "user added successfully",
      success: true,
      result: newuser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add user",
      success: false,
      error: error,
    });
  }
};

const loginuser = async (req, res) => {
  const { error, value } = loginvalidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { email, password } = req.body;
    const exist = await UserModel.findOne({ email: email });
    if (!exist) {
      return res.status(404).json({
        message: "user not exist",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password not match",
        success: false,
      });
    }

    const token = jwt.sign(
      { userid: exist._id, username: exist.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "user login sucessfull",
      token,

      success: true,
      result: exist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login user",
      success: false,
      error: error,
    });
  }
};
const viewusers = async (req, res) => {
  try {
    const allusers = await UserModel.find();
    if (allusers) {
      return res.status(200).json({
        message: "all users fetched",
        success: true,
        result: allusers,
      });
    }
    return res.status(404).json({
      message: "no user found",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to fetch users",
      success: false,
      error: error,
    });
  }
};
const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteduser = await UserModel.findByIdAndDelete(id);
    if (deleteduser) {
      return res.status(200).json({
        message: "User deleted",
        success: true,
        result: deleteduser,
      });
    }
    return res.status(400).json({
      message: "something went wrong",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to delete user",
      success: false,
    });
  }
};

const updateuser=async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,email,password}=req.body
         const user=await UserModel.findById(id);
         if(!user)
         {
            return res.status(404).json({
                message:"user not found",
                success:false
            })
         }
         if(email&& email!==user.email)
         {
             const emailexist=await UserModel.findOne({email})

             if(emailexist)
             {
              return res.status(400).json({
                message:"email already in use for another customer",
                success:false

              })
             }
         }
         let hashedpassword=user.password
         if(password)
         {
          hashedpassword=await bcrypt.hash(password,10)

        }
        user.name = name ;
        user.email = email ;
        user.password = hashedpassword;
        const updateduser=await user.save();
        return res.status(200).json({
          message: "User updated successfully",
          success: true,
          result: updateduser,
        });
    }
 

    catch (error) {
        return res.status(500).json({
          message: "failed to update user",
          success: false,
        });
      }
    };

    

module.exports = { createuser, loginuser, viewusers, deleteuser,updateuser };
