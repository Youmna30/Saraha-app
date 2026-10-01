import { OAuth2Client } from "google-auth-library";
import { AppError } from '../error/error.js';
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

export async function verifyGoogleToken( idToken ) {
    try {
        const ticket = await client.verifyIdToken( {
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        } );
        const payload = ticket.getPayload();
        return payload;
    } catch ( error ) {
        throw new AppError( "Invalid Google token", 403 );
    }

}