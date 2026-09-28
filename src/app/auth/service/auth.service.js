import { sendEmail } from "../../../common/email/nodemailer.js";
import * as authRepository from "../repository/auth.repo.js";
import * as otpRepository from "../repository/otp.repo.js";
import * as userRepository from "../../user/repository/user.repo.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as otp from "../../../common/utils/otp.js";
import { userAlreadyVerified, userNotExist, userNotVerified } from "../../user/errors.js";
import { incorrectPassword, invalidCode, optExpired } from "../errors.js";

export async function register( userData ) {
    const userExist = await authRepository.checkUserExistByEmail( userData.email );
    if ( userExist ) throw new userAlreadyExist;
    userData.password = await bcrypt.hash( userData.password, 10 );
    const createdUser = await authRepository.createUser( userData );
    const otpCode = otp.generateOtp();
    await otpRepository.createOtp( {
        code: otpCode,
        email: userData.email,
        expiresAt: Date.now() + 1000 * 60 * 5
    } )
    await sendEmail( userData.email, "Verification code", `Your verification code is ${ otp }` )
    return createdUser;
}

export async function verifyAccount( email, code ) {
    const user = await authRepository.checkUserExistByEmail( email );
    if ( !user ) throw new userNotExist;
    if ( user.isVerified === true ) throw userAlreadyVerified;
    const otp = await otpRepository.getOtpByEmail( email );
    if ( !otp ) throw optExpired;
    if ( otp.code !== code ) throw invalidCode;
    const updatedUser = await userRepository.updateUserByEmail( email, { isVerified: true } );
    await otpRepository.deleteOtp( email );
    return updatedUser;


}

export async function login( email, password ) {
    const user = await authRepository.checkUserExistByEmail( email );
    if ( !user ) throw new userNotExist;
    if ( user.isVerified === false ) throw userNotVerified;
    const match = await bcrypt.compare( password, user.password );
    if ( !match ) throw incorrectPassword;
    const token = jwt.sign( { id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" } )
    return token;
}

export async function sendOtp( email ) {
    const user = await authRepository.checkUserExistByEmail( email );
    if ( !user ) throw userNotExist;
    await otpRepository.deleteOtp( email );
    const otpCode = otp.generateOtp();
    await otpRepository.createOtp( {
        code: otpCode,
        email: email,
        expiresAt: Date.now() + 1000 * 60 * 5
    } )
    sendEmail( email, "Reset Password OTP", `Your otp code is ${ otpCode }` );
}