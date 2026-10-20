import { Types } from "mongoose";
import { z } from "zod";

export const createRequestDTO = z.object( {
    messageId: z.string( "Message is required" ).trim().refine( ( value ) => {
        return Types.ObjectId.isValid( value );
    } )
} );
export const acceptRequestDTO = z.object( {

    requestId: z.string( "Request Id is required" ).trim().refine( ( value ) => {
        return Types.ObjectId.isValid( value );
    } )
} );
export const rejectRequestDTO = z.object( {

    requestId: z.string( "Request Id is required" ).trim().refine( ( value ) => {
        return Types.ObjectId.isValid( value );
    } )
} );
