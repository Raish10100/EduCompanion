import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from  'cloudinary'
import fs from 'fs/promises'
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    httpOnly: true,
    secure: true,
}

const register = async (req, res, next) => {
try {
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

    // console.log(`File details`, JSON.stringify(req.file));

    if(req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill' 
            })

            if(result) {
                user.avatar.public_id =  result.public_id; 
                user.avatar.secure_url = result.secure_url;

                // Remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }

        } catch (error) {
            return next(
                new AppError(error || "File not uploaded, please try again", 400)
            )
        }
    }


    await user.save();

    user.password = undefined; // password field will be undefined in response.

    const token = await user.generateJWTToken();

    res.cookie('token', token, cookieOptions); 


// console.log(user) //!
    res.status(201).json({
        success: true,
        message: 'User registration successful',
        user,
    })

} catch (error) {
    console.log(error.message)
    // console.log(user)
} 

};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return next(new AppError('All fields are required', 400));
        };
    
        const user = await User.findOne({  // "user" variable holds all details related to the specific user.
            email 
        }).select('+password');
    
        if (!(user && (await user.comparePassword(password)))) {
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
        return next(new AppError(error.message, 500))
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

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    if(!email) {
        return next(new AppError('Email is required', 400));
    }

    // check for email exists in database or not.
    const user = await User.findOne({email});
    if(!user) {
        return next(new AppError('Email not exists', 400));
    }

    // console.log(user)
    // if email exists then generate reset token
    const resetToken = await user.generatePasswordResetToken(); 
    console.log(resetToken);
    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    const subject = 'Reset Password';
    const message = `
                        <p>We recently received a request to reset the password for your account. If you requested this reset, click the button below to create a new password.</p>
                        <br/>
                        <a href="${resetPasswordURL}" style="background-color: #3763da; color: white; padding: 10px 20px; text-decoration: none;">
                        Set a New Password
                        </a>
                        <br/>
                        <br/>
                        <p>If you did not request a password reset, you can safely ignore this email.</p>
                    `;  


    // send email to user with reset password url.
    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`
        });

    } catch (error) {

        // if there is any error then remove token
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken  = undefined;
        await user.save();
        
        next(new AppError(error.message, 500))
    }

}

const resetPassword = async(req, res, next) => {
    const { resetToken } = req.params;

    const { password } = req.body;

    const forgotPasswordToken = crypto
                                    .createHash('sha256')
                                    .update(resetToken)
                                    .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if(!user) {
        return next(new AppError(`Reset password token is invalid or expired`, 400));
    }

    try {
        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        user.save();
        res.status(200).json({
            success: true,
            message: "Reset password successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

const changePassword = async(req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if(!oldPassword || !newPassword) {
        return next(
            new AppError("All fields are mandatory", 400),
        )
    };

    const user = await User.findById(id).select('+password');

    if(!user) {
        return next(new AppError("User not found", 400))
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if(!isPasswordValid) {
        return next(new AppError("Old password is invalid", 400))
    };

    user.password = newPassword;

    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })

}

const updateUser = async(req, res, next) => {
    const { fullName } = req.body;
    const { id }  = req.user;

    const user = await User.findById(id);

    if(!user) {
        return next(new AppError('User not found', 400));
    }

    // if user had given there name then only update it.
    if(fullName) {
        user.fullName = fullName;
    };

    if(req.file) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: 'lms', // Save files in a folder named lms
              width: 250,
              height: 250,
              gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
              crop: 'fill',
            });
      
            // If success
            if (result) {
              // Set the public_id and secure_url in DB
              user.avatar.public_id = result.public_id;
              user.avatar.secure_url = result.secure_url;
              // After successful upload remove the file from local storage
              fs.rm(`uploads/${req.file.filename}`);
            }
          } catch (error) {
            return next(
              new AppError(error || 'File not uploaded, please try again', 400)
            );
          }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "User details updated successfully",
    })
}

export {
    register, 
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}