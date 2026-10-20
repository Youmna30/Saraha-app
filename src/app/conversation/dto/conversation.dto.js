import { Types } from "mongoose";
import { z } from "zod";

export const createConversationDTO = z.object( {
    conversationId: z.string( "conversation id is required" ).trim().refine( ( value ) => {
        return Types.ObjectId.isValid( value );
    } ),
    receiver: z.string( "Receiver is required" ).trim().refine( ( value ) => {
        return Types.ObjectId.isValid( value );
    } ),
    content: z.string( "Content message is required" ).trim().min( 1 ).max( 500 ),

} )