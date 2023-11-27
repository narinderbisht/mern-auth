import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyUser = (req, res, next) => {
    console.log('Cookies:', req.cookies);
    const token = req.cookies.access_token;
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                next(errorHandler(401, "Authentication faliure"));
            } else {
                req.user = user;
                next();
            }
        });
        
    } else {
        next(errorHandler(401, 'You need to login'));
    }
}