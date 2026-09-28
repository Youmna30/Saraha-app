import { AppError } from "../../common/error/error.js";

export const optExpired = new AppError( "OTP expired, please resend otp.", 404 );
export const invalidCode = new AppError( "Invalid code", 400 );
export const incorrectPassword = new AppError( "Incorrect password", 403 );