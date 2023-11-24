import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';

export const signup = async(req, res) => {
    //console.log(req.body);
    const hasedPassword = bcryptjs.hashSync(req.body.password, 10);
    const userSignup = new User({
        "username": req.body.username,
        "email": req.body.email,
        "password": hasedPassword
    });

    try {
        
        await userSignup.save();
        res.status(201).json({
            "message": "User created successfully"
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}