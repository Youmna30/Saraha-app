import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import { AppError } from "../../pkg/error/error.js";

export const allowedFiles = {
    image: [ "image/jpeg", "image/png" ],
    video: [ "video/mp4" ],
    audio: [ "audio/mp3" ],
    file: [ "application/pdf", "application/msword" ]
}


// Middleware to validate file type by magic number (file signatures)
export const fileValidation = ( allowedTypes = allowedFiles.image ) => {
    return async ( req, res, next ) => {
        try {
            if ( req.file.size > 5 * 1024 * 1024 ) {
                throw new AppError( "File size exceeds limit", 400 );
            }
            // get the file path
            const filePath = req.file.path;
            // read the file and return buffer
            const buffer = fs.readFileSync( filePath );
            // get the file type
            const type = await fileTypeFromBuffer( buffer );
            // validate
            if ( !type || !allowedTypes.includes( type.mime ) ) {
                fs.unlinkSync( filePath ); // delete the file if invalid
                return next( new AppError( "Invalid file type", 400 ) );
            }

            return next();
        } catch ( error ) {
            return next( error );
        }
    }
}