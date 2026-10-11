import { validateBody } from '../../../lib/validation/validation.js';
import { createMessageDTO } from '../dto/message.dto.js';
import * as messageService from '../service/message.service.js';

export async function createMessage( req, res, next ) {
    try {
        const data = validateBody( createMessageDTO, req.body );
        const { content, receiver } = data;
        const sender = req.user?.id;
        const message = await messageService.createMessage( content, receiver, sender );
        return res.status( 201 ).json( {
            message: "Message created successfully",
            success: true,
            data: message
        } )
    } catch ( err ) {
        next( err );
    }
}

export async function getUserMessages( req, res, next ) {
    try {
        const userId = req.user.id;
        const messages = await messageService.getUserMessages( userId );
        return res.status( 200 ).json( {
            message: "Messages retrieved successfully",
            success: true,
            data: messages
        } )
    } catch ( err ) {
        next( err );
    }
}