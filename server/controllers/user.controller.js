import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";


const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    httpOnly: true,
    secure: true,
}

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        return next(new AppError("All fields are required", 400));
    };

    const userExists = await User.findOne({email});
 
    if(userExists) {
        return next(new AppError('Email already exists', 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: "random",      // temporary   
            secure_url: "random"     // temporary
        }
    })

    if (!user) {
        return next(new AppError('User registration failed,Please try again later', 400))
    }

    //TODO: File upoad to cloudinary and save the url in user model.


    await user.save();

    user.password = undefined; // password field will be undefined in response.

    const token = await user.generateJWTToken();

    res.cookie('token', token, cookieOptions); 

    res.status(201).json({
        success: true,
        message: 'User registration successful',
        user,
    })


};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return next(new AppError('All fields are required', 400));
        };
    
        const user = await User.findOne({  // "user" variable holds all details related to the specific user.
            email 
        }).select('+password');
    
        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Email or password is incorrect', 400));
        }
    
        const token = await user.generateJWTToken();
        user.password = undefined;
    
    
        res.cookie('token', token, cookieOptions);
    
        res.status(200).json({
            success: true,
            message: 'User loggedin successfully',
            user,
        })
    
    } catch (error) {
        return next(new AppError(e.message, 500))
    }
};

const logout = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
    
        res.status(200).json({
            success: true,
            message: 'User details',
            user 
        });
      } catch (error) {
           return next(new AppError('Failed to fetch profile data', 500));
      }
};

export {
    register, 
    login,
    logout,
    getProfile
}