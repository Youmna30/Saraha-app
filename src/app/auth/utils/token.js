import jwt from "jsonwebtoken";
import { env } from "../../../lib/config/env.js";

export function generateToken( payload ) {
    return jwt.sign( payload, env.jwt.secretKey, { expiresIn: "1h" } )
}