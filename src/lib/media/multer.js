import multer, { diskStorage } from 'multer';
import crypto from 'crypto';
import { AppError } from '../../pkg/error/error.js';
import { allowedFiles } from './file.validation.js';

function multerUpload( allowedTypes = allowedFiles.image ) {
    return multer( {
        fileFilter: function ( req, file, cb ) {
            if ( !allowedTypes.includes( file.mimetype ) ) {
                return cb( new AppError( 'Invalid file type', 400 ), false );
            }
            cb( null, true );

        },
        storage: diskStorage( {
            destination: 'uploads',
            filename: function ( req, file, cb ) {
                cb( null, `${ crypto.randomUUID() }-${ file.originalname }` );

            }
        } )
    } )
}

export function uploadSingleFile( fieldName, allowedTypes = allowedFiles.image ) {
    return multerUpload( allowedTypes ).single( fieldName );
}
export function uploadArrayFiles( fieldName, maxCount ) {
    return multerUpload().array( fieldName, maxCount );
}
export function uploadFields( fields ) {
    return multerUpload().fields( fields );
}


