import Request from "../model/request.model.js";

export async function getSenderRequests( senderId ) {
    return await Request.find( { sender: senderId } );
}

export async function createRequest( data ) {
    return await Request.create( data );
}

export async function acceptRequest( requestId ) {
    return await Request.findByIdAndUpdate( requestId, { "status": "accepted" }, {
        returnDocument: "after"
    } )
}
export async function rejectRequest( requestId ) {
    return await Request.findByIdAndUpdate( requestId, { "status": "rejected" }, {
        returnDocument: "after"
    } )
}

export async function getRequestByMessageId( messageId ) {
    return await Request.findOne( { messageId } );
}
export async function getRequestById( requestId ) {
    return await Request.findOne( { _id: requestId } );
}