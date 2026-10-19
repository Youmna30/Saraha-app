import { sendEmail } from "../../../lib/email/nodemailer.js";
import * as authRepository from "../repository/auth.repo.js";
import * as otpRepository from "../repository/otp.repo.js";
import * as userRepository from "../../user/repository/user.repo.js"
import * as otp from "../../../lib/utils/otp.js";
import { userAlreadyVerified, userNotExist, userNotVerified, userAlreadyExist } from "../../user/errors.js";
import { incorrectPassword, invalidCode, invalidRefreshToken, noToken, optExpired } from "../errors.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { decodeToken, generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { verifyGoogleToken } from "../../../lib/utils/google.auth.js";
import { mailjetProvider } from "../../../lib/email/init.js";

export async function register( userData ) {
    const userExist = await authRepository.checkUserExistByEmail( userData.email );
    if ( userExist ) throw userAlreadyExist;
    userData.password = await hashPassword( userData.password );
    const createdUser = await authRepository.createUser( userData );
    const otpCode = otp.generateOtp();
    await otpRepository.createOtp( {
        code: otpCode,
        email: userData.email,
        expiresAt: Date.now() + 1000 * 60 * 5
    } )
    await mailjetProvider.sendEmail( userData.email, "Verification code", `Your verification code is ${ otpCode }` )
    return createdUser;
}

export async function verifyAccount( email, code ) {
    const user = await authRepository.checkUserExistByEmail( email );
    if ( !user ) throw userNotExist;
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
    if ( !user ) throw userNotExist;
    if ( user.isVerified === false ) throw userNotVerified;
    const match = await comparePassword( password, user.password );
    if ( !match ) throw incorrectPassword;
    const accessToken = generateAccessToken( { id: user._id, email: user.email, name: user.name } );
    const refreshToken = generateRefreshToken( { id: user._id, email: user.email, name: user.name } );

    return { accessToken, refreshToken };
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
    await mailjetProvider.sendEmail( email, "Reset Password OTP", `Your otp code is ${ otpCode }` );
}

export async function resetPassword( email, code, newPassword ) {
    const otp = await otpRepository.getOtpByEmail( email );
    if ( !otp ) throw optExpired;
    if ( otp.code !== code ) throw invalidCode;
    await otpRepository.deleteOtp( email );
    const hashNewPassword = await hashPassword( newPassword );
    await userRepository.updateUserByEmail( email, { password: hashNewPassword } );
}

export async function loginWithGoogle( idToken ) {
    const payload = await verifyGoogleToken( idToken );
    const user = await authRepository.checkUserExistByEmail( payload.email );
    if ( user ) {
        const accessToken = generateAccessToken( { id: user._id, email: user.email, name: user.name } );
        const refreshToken = generateRefreshToken( { id: user._id, email: user.email, name: user.name } );

        return { accessToken, refreshToken };
    }
    const createdUser = await authRepository.createUser( {
        email: payload.email,
        name: payload.name,
        provider: "google",
        isVerified: true
    } );
    const accessToken = generateAccessToken( { id: user._id, email: user.email, name: user.name } );
    const refreshToken = generateRefreshToken( { id: user._id, email: user.email, name: user.name } );

    return { accessToken, refreshToken };
}

export async function refreshToken( refreshToken ) {
    if ( !refreshToken ) {
        throw noToken;
    }
    const user = await decodeToken( refreshToken );
    if ( !user ) {
        throw invalidRefreshToken;
    }
    const accessToken = generateAccessToken( { id: user._id, email: user.email, name: user.name } )
    return accessToken;

}