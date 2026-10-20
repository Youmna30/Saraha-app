import * as requestService from "../service/request.service.js";
import { validateBody } from '../../../lib/validation/validation.js';
import { acceptRequestDTO, createRequestDTO, rejectRequestDTO } from "../dto/request.dto.js";

export async function getSenderRequests( req, res, next ) {
    try {
        const userId = req.user.id;
        const requests = await requestService.getSenderRequests( userId );
        res.status( 200 ).send( {
            "message": "Requests retreived successfully",
            success: true,
            requests
        } )

    } catch ( error ) {
        next( error );
    }
}
export async function createRequest( req, res, next ) {
    try {
        const receiver = req.user.id;
        const data = validateBody( createRequestDTO, req.body );
        const request = await requestService.createRequest( { ...data, receiver } );
        res.status( 201 ).send( {
            "message": "Request is created successfully",
            success: true,
            request
        } )

    } catch ( error ) {
        next( error );
    }
}
export async function acceptRequest( req, res, next ) {
    try {
        const sender = req.user.id;
        const data = validateBody( acceptRequestDTO, req.body );
        const request = await requestService.acceptRequest( data.requestId, sender );
        res.status( 200 ).send( {
            "message": "Request is accepted successfully",
            success: true,
            request
        } )

    } catch ( error ) {
        next( error );
    }
}
export async function rejectRequest( req, res, next ) {
    try {
        const sender = req.user.id;
        const data = validateBody( rejectRequestDTO, req.body );
        const request = await requestService.rejectRequest( data.requestId, sender );
        res.status( 200 ).send( {
            "message": "Request is rejected successfully",
            success: true,
            request
        } )

    } catch ( error ) {
        next( error );
    }
}