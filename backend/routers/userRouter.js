import express from 'express';
import { userLogin, userRegister, userUpdateProfile } from '../controllers/userController.js';
import { upload } from '../utils/cloudinary.js';
import verifyToken from '../middlewares/verifyToken.js';


const userRouter=express.Router();


userRouter.route("/register").post(upload.single("profilePicture"), userRegister);
userRouter.route("/login").post(userLogin);
// userRouter.route("/update-profile").put(verifyToken,upload.single("profilePicture"), userUpdateProfile);

// في الـ router مؤقتاً
userRouter.route("/update-profile").put(
    verifyToken,
    (req, res, next) => {
        upload.single("profilePicture")(req, res, (err) => {
            if (err) {
                console.log("Multer Error:", err); // ← شوف الـ error إيه
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    userUpdateProfile
);

userRouter.route("/profile").get(verifyToken, (req,res)=>{
    const user =req.user;
    res.json({state:'success',message: "User profile", user});
})



export default userRouter;