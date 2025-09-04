import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        minLength: [8, "Password should be at least 8 characters"],
        maxLength: [32, "Password should not exceed 32 characters"],
        },
        phone: String,
        accountVerified: {
            type: Boolean,
            default: false,
        },
        verificationCode: Number,
        verificationCodeExpire: Date,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        createdAt:
        {
            type: Date,
            default: Date.now,
        },
});

//password ko original form me store na kr ke hash form m store krne ke liye
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//password ko compare krne ke liye
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function() {
    function generateRandomFiveDigitNumber(){
        const firstDigit = Math.floor(Math.random() * 9) + 1; // First digit cannot be 0

        const remainingDigits = Math.floor(Math.random() * 10000) //
        .toString()   // Generate a random number between 0 and 9999 and convert it to a string and ensure it has 4 digits and pad with leading zeros if necessary
        .padStart(4, "0");  //iska matlab hai ki agar 4 digit se kam hai to leading zeros add kr dega      

        return parseInt(firstDigit + remainingDigits );  // Combine the first digit with the remaining digits and convert it to an integer
    }

    const verificationCode = generateRandomFiveDigitNumber(); // Generate a random 5-digit verification code
    this.verificationCode = verificationCode; // Set the verification code in the user schema
    this.verificationCodeExpire = Date.now() + 5 * 60 * 1000; // Set expiry to 15 minutes from now

    return verificationCode;
};

userSchema.methods.generateToken = function() { // Method to generate JWT token
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


userSchema.methods.generateResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken= crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;

}

export  const User = mongoose.model("User", userSchema);
