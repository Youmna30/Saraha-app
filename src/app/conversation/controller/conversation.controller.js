import { validateBody } from "../../../lib/validation/validation.js";
import { createConversationDTO } from "../dto/conversation.dto.js";
import * as conversationService from "../service/conversation.service.js";

export async function getConversation( req, res, next ) {
    try {
        const userId = req.user.id;
        const conversation = await conversationService.getConversation( userId );
        res.status( 200 ).json( {
            "message": "Conversation retrevied successfully",
            "success": true,
            conversation
        } )
    } catch ( error ) {
        next( error );
    }
}

export async function createMessageInsideConversation( req, res, next ) {
    try {
        const sender = req.user.id;
        const data = validateBody( createConversationDTO, req.body );
        const conversation = await conversationService.createMessageInsideConversation( data, sender );
        res.status( 200 ).json( {
            "message": "Message send in conversation successfully",
            "success": true,
            conversation
        } )
    } catch ( error ) {
        next( error );
    }
}