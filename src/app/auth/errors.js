import { AppError } from "../../pkg/error/error.js";

export const optExpired = new AppError( "OTP expired, please resend otp.", 404 );
export const invalidCode = new AppError( "Invalid code", 400 );
export const incorrectPassword = new AppError( "Incorrect password", 403 );
export const noToken = new AppError( "No token provided", 401 );
export const invalidRefreshToken = new AppError( "Invalid or expired refresh token", 401 );
export const blockedLogin = new AppError( "You're temporarily banned", 429 );
export const alreadyTwoStepVerification = new AppError( "Two step verification is already enabled", 409 );
export const noTwoStepVerification = new AppError( "Two step verification isn't enabled", 400 )