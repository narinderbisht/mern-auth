import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) => {
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
        next(errorHandler(500, err.message));
        // next(err); // can use as middelware
        //res.status(500).json(err.message);
    }
}

export const signin = async (req, res, next) => {
    console.log(req.body);
    try {
        const validUser = await User.findOne({ email: req.body.email });
        if (!validUser) {
            return next(errorHandler(404, 'User is not found'));
        }
        const validPassword = bcryptjs.compareSync(req.body.password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hasedPassword, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true, expire: new Date(Date.now()) + 3600000 }).status(201).json( rest );

    } catch (error) {
        //next(errorHandler(500, error.message));
        next(error);
    }
        
    
}