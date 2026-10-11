import { OAuth2Client } from "google-auth-library";
import { AppError } from '../../pkg/error/error.js';
import { env } from "../config/env.js";
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

export async function verifyGoogleToken( idToken ) {
    try {
        const ticket = await client.verifyIdToken( {
            idToken: idToken,
            audience: env.google.googleWebClientId
        } );
        const payload = ticket.getPayload();
        return payload;
    } catch ( error ) {
        throw new AppError( "Invalid Google token", 403 );
    }

}