import http from "http";
import { createApp } from "./app.js";
import mongoose from "mongoose";
import { env } from './lib/config/env.js';
import { logger } from "./pkg/logger/logger.js";

const app = createApp();
const server = http.createServer( app );
app.listen( env.port, () => {
    logger.info( "Server is running on port " + env.port )

} )
function shutdown() {
    server.close( async () => {
        await mongoose.disconnect();
        process.exit( 0 );
    } )
}
process.on( 'SIGINT', shutdown );
process.on( 'SIGTERM', shutdown );
