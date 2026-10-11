import { AppError } from "../../pkg/error/error.js";

export const errorCreateMessage = new AppError( 'Error while creating message', 400 );
export const noMessagesFound = new AppError( 'No messages found', 404 );