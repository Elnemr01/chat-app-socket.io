import User from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";


const verifyToken = async (req, res, next) => {

    const header = req.headers.authorization || req.headers.Authorization;
    const token = header && header.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status:"fail",
            message:"Unauthorized"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;
    next();
    // try {

    // } catch (error) {
    //     return res.status(401).json({
    //         status:"fail",
    //         message:"Unauthorized"
    //     });
    // }
    
}

export default verifyToken;