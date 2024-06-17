import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
console.log(token)
    if(!token) {
        return next(new AppError('Unautheniticated, please login again', 400));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;

    return next();
};

const authorizedRoles = (...roles) => {   // argument converted into array

    return async (req, res, next) => {     
        const currentUserRole = req.user.role;
        if(!roles.includes(currentUserRole)) {
            return next(
                new AppError('You are not authorized to perform this action', 403)
            )
        }
        next();
    }
}

const authorizeSubscriber = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    // console.log(user)

    const subscription = user.subscription;
    const currentUserRole = user.role;

    console.log(`subscription: ${subscription.status} , currentUserRole ====> ${currentUserRole}`)
    
    if(currentUserRole !== 'ADMIN' && subscription.status !== 'active') {
        return next(
            new AppError('Please subscribe to access this resource', 403)
            )
    }
        console.log('Authorized')
    next();
}

export  {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber
}