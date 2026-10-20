import { AppError } from "../../pkg/error/error.js";

export const notAllowedinCoversation = new AppError( "You are not allowed to send a message in this conversation", 403 );
export const noConversation = new AppError( "No Conversation found", 404 );