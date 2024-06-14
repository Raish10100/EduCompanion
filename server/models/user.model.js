import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 character'],
        maxLength: [25, 'Name must not exceed 25 character'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'], 
        unique: true,
        lowercase: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please fill in a valid email address',
        ], 
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxLength: [16, "Password length must be less then 16 characters"],
        select: false, 
      },
      subscription: {
        id: String,
        status: String,
      },
      avatar: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
      role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
      },
      forgotPasswordToken: String,
      forgotPasswordExpiry: Date, 
    },
    {
      timestamps: true,
    }
);


// Password hashing middleware: hashes the password before saving to database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
})


// methods
userSchema.methods = {
  // jwt token generation
  generateJWTToken: async function() {
    return await jwt.sign(
      { id: this._id, role: this.role, subscription: this.subscription},
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    )
  },
  comparePassword: async function(plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },
  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Adding forgot password expiry to 15 minutes
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },


}
 




const User = model('User', userSchema);

export default User;