import { Types } from "mongoose";
import { z } from "zod";

export const createMessageDTO = z.object( {
    content: z.string( "Content message is required" ).trim().min( 1 ).max( 500 ),
    receiver: z.string( "Receiver is required" ).trim().refine( ( value ) => {
        return Types.ObjectId.isValid( value );
    } )
} )