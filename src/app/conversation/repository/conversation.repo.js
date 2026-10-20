import Conversation from "../model/conversation.model.js";

export async function createConversation( data ) {
    return await Conversation.create( data );
}

export async function getConversation( participantId ) {
    return await Conversation.findOne( { participants: participantId }, {}, { populate: [ { path: "participants", select: "name email" }, { path: "messages", select: "content" } ] } )
}
export async function getConversationOfTwoParticipants( sender, receiver ) {
    return await Conversation.findOne( { participants: { $all: [ sender, receiver ] } } );

}
export async function addMessageToConversation( conversationId, messageId ) {
    return await Conversation.findByIdAndUpdate( conversationId, { $push: { messages: messageId } }, { returnDocument: "after" } );
}
export async function getConversationById( conversationId ) {
    return await Conversation.findById( conversationId );
}
