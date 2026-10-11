import * as userServce from "../service/user.service.js"

export async function uploadProfilePicture( req, res, next ) {

    try {
        const userId = req.user.id;
        const updatedUser = await userServce.uploadProfilePicture( userId, req.file.path );
        res.json( {
            message: "Profile picture uploaded successfully",
            success: true,
            user: updatedUser

        } )
    } catch ( error ) {
        next( error );
    }
}
export async function uploadArrayImages( req, res, next ) {

    try {
        const userId = req.user.id;
        const updatedUser = await userServce.uploadCoverImages( userId, req.files );
        res.json( {
            message: "Cover images uploaded successfully",
            success: true,
            user: updatedUser
        } )
    } catch ( error ) {
        next( error );
    }
}
export async function uploadCv( req, res, next ) {
    try {
        const userId = req.user.id;
        const updatedUser = await userServce.uploadCv( userId, req.file.path );
        res.json( {
            message: "CV uploaded successfully",
            success: true,
            user: updatedUser

        } )
    } catch ( error ) {
        next( error );
    }
}

export async function getAllUsers( req, res, next ) {

    try {
        const users = await userServce.getAllUsers();
        res.json( {
            message: "Users retreived successfully",
            success: true,
            data: users
        } )
    } catch ( error ) {
        next( error );
    }
}