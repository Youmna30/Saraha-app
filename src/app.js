import express from "express";
import "./lib/db/mongoose.js";
import authRouter from "./app/auth/auth.route.js";
import userRouter from "./app/user/user.route.js";
import messageRouter from './app/message/message.route.js';
import { logger } from "./pkg/logger/logger.js";
import cors from "cors";
import { env } from "./lib/config/env.js";
import { globalErrorHandler } from "./lib/error/error.handler.js";
import { router } from "./route.js";
import { generateCorrelationId } from "./lib/correlation/correlationId.js";
import cookieParser from "cookie-parser";



export function createApp() {
    const app = express();
    app.use( cors( {
        origin: "http://localhost:4200"
    } ) );
    app.use( express.json() );
    app.use( cookieParser() );

    app.use( generateCorrelationId );

    app.use( "/api", router );

    app.use( globalErrorHandler );

    return app;
}


