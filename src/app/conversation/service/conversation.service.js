import * as conversationRepo from "../repository/conversation.repo.js";
import * as messageRepo from "../../message/respository/message.repo.js";
import { noConversation, notAllowedinCoversation } from "../errors.js";

export async function getConversation( participant ) {
    const conversation = await conversationRepo.getConversation( participant );
    if ( !conversation ) throw noConversation;
    return conversation;
}
export async function createMessageInsideConversation( data, sender ) {
    const conversation = await conversationRepo.getConversationById( data.conversationId );
    if ( !conversation.participants.includes( sender ) || !conversation.participants.includes( data.receiver ) ) {
        throw notAllowedinCoversation;
    }
    const message = await messageRepo.createMessage( data.content, data.receiver, sender, false );
    const updatedConversation = await conversationRepo.addMessageToConversation( data.conversationId, message._id );
    return updatedConversation;
}