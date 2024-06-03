import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

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


export  {
    isLoggedIn,
    authorizedRoles
}