import { messageReceiverOnly, messageSenderOnly, noRequestFound, privateMessage, requestAlreadyAccepted, requestAlreadyRejected, requestExisted } from "../errors.js";
import * as requestRepo from "../repository/request.repository.js";
import * as messageRepo from "../../message/respository/message.repo.js"
import { noMessagesFound } from "../../message/error.js";
import * as userRepo from "../../user/repository/user.repo.js"
import { userNotExist } from "../../user/errors.js";

export async function getSenderRequests( senderId ) {
    const requests = await requestRepo.getSenderRequests( senderId );
    return requests;
}

export async function createRequest( data ) {
    const messageId = data.messageId;
    const receiverId = data.receiver;
    const existedRequest = await requestRepo.getRequestByMessageId( messageId );
    if ( existedRequest ) throw requestExisted;
    const checkMessage = await messageRepo.getMessageById( messageId );
    if ( !checkMessage ) throw noMessagesFound;
    if ( !checkMessage.sender ) throw privateMessage;
    const checkReceiver = await userRepo.findUserById( receiverId );
    if ( !checkReceiver ) throw userNotExist;
    if ( receiverId !== checkMessage.receiver.toString() ) throw messageReceiverOnly;
    const request = await requestRepo.createRequest( { ...data, sender: checkMessage.sender } );
    return request;
}

export async function acceptRequest( requestId, senderId ) {
    const checkRequest = await requestRepo.getRequestById( requestId );
    if ( !checkRequest ) throw noRequestFound;
    if ( checkRequest.status === "accepted" ) throw requestAlreadyAccepted;
    if ( checkRequest.status === "rejected" ) throw requestAlreadyRejected;
    if ( senderId !== checkRequest.sender.toString() ) throw messageSenderOnly;
    const request = await requestRepo.acceptRequest( requestId );
    await messageRepo.changeMessageIdentity( request.messageId )
    return request;

}
export async function rejectRequest( requestId, senderId ) {
    const checkRequest = await requestRepo.getRequestById( requestId );
    if ( !checkRequest ) throw noRequestFound;
    if ( checkRequest.status === "accepted" ) throw requestAlreadyAccepted;
    if ( checkRequest.status === "rejected" ) throw requestAlreadyRejected;
    if ( senderId !== checkRequest.sender.toString() ) throw messageSenderOnly;
    const request = await requestRepo.rejectRequest( requestId );
    return request;

}