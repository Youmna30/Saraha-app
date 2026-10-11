import { logger } from "../../pkg/logger/logger.js"

export function globalErrorHandler( err, req, res, next ) {
    logger.error( err.message, {
        stack: err.stack,
        correlationId: req.correlationId
    } ) // to be removed on production
    if ( err.isOperational === true ) {
        return res.status( err.statusCode ).json( {
            message: err.message,
            success: false,
            stack: err.stack // to be removed on production
        } )
    }
    return res.status( 500 ).json( {
        message: "Something went wrong",
        success: false,
        stack: err.stack
    } )

}