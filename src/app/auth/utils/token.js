import jwt from "jsonwebtoken";
import { env } from "../../../lib/config/env.js";
import { invalidRefreshToken } from "../errors.js";

export function generateAccessToken( payload ) {
    return jwt.sign( payload, env.jwt.secretAccessKey, { expiresIn: "1h" } )
}
export function generateRefreshToken( payload ) {
    return jwt.sign( payload, env.jwt.secretRefreshKey, { expiresIn: "7d" } )
}
export async function decodeToken( token ) {
    try {
        const user = jwt.verify( token, env.jwt.secretRefreshKey );
        return user;
    } catch ( error ) {
        throw invalidRefreshToken
    }
}