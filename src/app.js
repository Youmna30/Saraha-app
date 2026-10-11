import express from "express";
import "./lib/db/mongoose.js";
import cors from "cors";
import { globalErrorHandler } from "./lib/error/error.handler.js";
import { router } from "./route.js";
import { generateCorrelationId } from "./pkg/correlation/correlationId.js";
import cookieParser from "cookie-parser";



export function createApp() {
    const app = express();
    app.use( cors( {
        origin: "http://localhost:4200"
    } ) );
    app.use( '/uploads', express.static( 'uploads' ) )
    app.use( express.json() );
    app.use( cookieParser() );

    app.use( generateCorrelationId );

    app.use( "/api", router );

    app.use( globalErrorHandler );

    return app;
}


