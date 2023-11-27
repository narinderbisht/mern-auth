import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs";
export const testRoute = (req, res) => {
    res.json({
        'message': 'API routes are working.'
    });
    

}

export const userUpdate = async (req, res, next) => {
    //console.log(req.params.id);
    if (req.params.id !== req.user.id) {
        next(errorHandler(401, 'You can only update your profile'));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        } 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        
        res.status(201).json(rest);

    } catch (error) {
        next(error);
    }
} 