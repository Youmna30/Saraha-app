import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const schema = z.object( {
    PORT: z.string().default( "3000" ),
    MONGODB_URL: z.string(),
    JWT_SECRET_ACCESS_KEY: z.string(),
    JWT_SECRET_REFRESH_KEY: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string().default( "6379" ),
    REDIS_PASSWORD: z.string().optional(),
    MAIL_USER: z.string().trim().toLowerCase(),
    MAIL_PASSWORD: z.string(),
    MAIL_NAME: z.string(),
    GOOGLE_WEB_OAUTH_CLIENT_ID: z.string(),
    MAILJET_API_KEY: z.string(),
    MAILJET_API_SECRET: z.string()
} );

const parsed = schema.parse( process.env );
export const env = {
    port: Number( parsed.PORT ),
    db: {
        url: parsed.MONGODB_URL
    },
    redis: {
        host: parsed.REDIS_HOST,
        port: Number( parsed.REDIS_PORT ),
        password: parsed.REDIS_PASSWORD
    },
    nodemailer: {
        user: parsed.MAIL_USER,
        password: parsed.MAIL_PASSWORD
    },
    jwt: {
        secretAccessKey: parsed.JWT_SECRET_ACCESS_KEY,
        secretRefreshKey: parsed.JWT_SECRET_REFRESH_KEY

    },
    google: {
        googleWebClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID
    },
    mailjet: {
        apiKey: parsed.MAILJET_API_KEY,
        apiSecret: parsed.MAILJET_API_SECRET,
        fromEmail: parsed.MAIL_USER,
        fromName: parsed.MAIL_NAME
    }
}
