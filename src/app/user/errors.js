import { AppError } from "../../common/error/error.js"

export const userNotExist = new AppError( "User already exists", 404 );
export const userNotVerified = new AppError( "User isn't verified", 403 );
export const userAlreadyVerified = new AppError( "User is already verified", 400 );
export const userAlreadyExist = new AppError( "User already exists", 409 );