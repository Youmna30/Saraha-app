
import { AppError } from '../../pkg/error/error.js';

export const requestExisted = new AppError( "Request already existed", 409 );
export const noRequestFound = new AppError( "Request is not found", 404 );
export const requestAlreadyAccepted = new AppError( "Request is already accepted", 409 );
export const requestAlreadyRejected = new AppError( "Request is already rejected", 409 );
export const messageSenderOnly = new AppError( "The Sender only is allowed to respond", 403 );
export const messageReceiverOnly = new AppError( "The Receiver only is allowed to request", 403 );
export const privateMessage = new AppError( "This message isn't allowed for viewing sender identity", 403 );