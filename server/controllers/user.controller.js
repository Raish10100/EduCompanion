import User from "../models/user.model";

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


};

const login = (req, res) => {

};

const logout = (req, res) => {

};

const getProfile = (req, res) => {

};

export {
    register,
    login,
    logout,
    getProfile
}