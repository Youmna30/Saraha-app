import Redis from "ioredis";
import { logger } from "../logger/logger.js";

export class RedisCacheProvider {
    client;
    constructor( config ) {
        this.client = new Redis( {
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3
        } );
        this.client.on( "error", ( err ) => {
            logger.error( "Redis Server Error", { errorMessage: err.message } )
        } )
        this.client.connect().catch( err => logger.error( "Redis Connection Error", { errorMessage: err.message } ) );
    }
    async set( key, value, ttl ) {
        return this.client.set( key, value, 'EX', ttl );
    }
    async get( key ) {
        return this.client.get( key );
    }
    async del( key ) {
        return this.client.del( key );
    }
}