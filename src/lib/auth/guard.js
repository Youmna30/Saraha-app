import { noToken } from "../../app/auth/errors.js";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.js";

export function authGuard( req, res, next ) {
    try {
        const token = req.cookies.access_token;
        if ( !token ) throw noToken;
        req.user = jwt.verify( token, env.jwt.secretKey );
        next();

    } catch ( error ) {
        next( error );
    }

}