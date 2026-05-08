import User from "../schemas/userSchema.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const userRegister= async (req, res) => {
    const {fullName,email,password,bio}=req.body;
    const pictureUrl = req.file?.path;
    try {
        const oldUser = await User.findOne({email});
        if(oldUser) {
            return res.status(400).json({
                status:"fail",
                message:"User with this email already exists"
            });
        }
    
        // hash password
        const hashedPassword= await bcrypt.hash(password,10);
    
        const newUser= new User({
            fullName,
            email,
            password:hashedPassword,
            bio,
            profilePicture: pictureUrl,
        });
    
        // generate token
        const token = generateToken({id:newUser._id,email:newUser.email});
    
        await newUser.save();
    
        return res.status(201).json({
            status:"success",
            message:"User registered successfully",
            user:newUser,
            token,
        }); 
    } catch (error) {
        return res.status(500).json({
            status:"error",
            message:"Internal server error",
        }); 
    }
}

export const userLogin= async (req, res) => {
    const {email,password}=req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                status:"fail",
                message:"User with this email does not exist"
            });
        }

        const matchPassword= await bcrypt.compare(password,user.password);

        if(!matchPassword) {
            return res.status(400).json({
                status:"fail",
                message:"password is incorrect"
            });
        }

        const token = generateToken({id:user._id,email:user.email});
        return res.status(200).json({
            status:"success",
            message:"User logged in successfully",
            user,
            token,
        });


    }
    catch (error) {
        return res.status(500).json({
            status:"error",
            message:"Internal server error",
        }); 
    }
    
}

export const userUpdateProfile= async (req,res) => {
    const {fullName,bio}=req.body;
    const pictureUrl = req.file?.path;
    const id=req.user._id;
    try {

        const oldUser = await User.findById(id);
        const newUser= await User.findByIdAndUpdate(id,{
            ...oldUser,
            bio,
            fullName,
            profilePicture: pictureUrl,
        },{new:true});

        return res.status(200).json({
            status:"success",
            message:"User profile updated successfully",
            user:newUser,
        }); 
    } catch (error) {
        return res.status(500).json({
            status:"error",
            message:"Internal server error",
        }); 
    }
}

