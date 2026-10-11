import { noUsers, userNotExist } from "../errors.js";
import * as userRepository from "../repository/user.repo.js";
import fs from "fs";
export async function uploadProfilePicture( userId, profilePicturePath ) {
    const user = await userRepository.findUserById( userId );
    if ( !user ) throw userNotExist;
    if ( user.profilePicturePath ) {
        // delete the old profile picture
        fs.unlinkSync( user.profilePicturePath );

    }
    const updatedUser = await userRepository.updateUserByEmail( user.email, { profilePicturePath } )
    return updatedUser;
}
export async function uploadCv( userId, cvPath ) {
    const user = await userRepository.findUserById( userId );
    if ( !user ) throw userNotExist;
    if ( user.cvPath ) {
        // delete the old cv
        fs.unlinkSync( user.cvPath );

    }
    const updatedUser = await userRepository.updateUserByEmail( user.email, { cvPath } )
    return updatedUser;
}
export async function uploadCoverImages( userId, filesPaths ) {
    const user = await userRepository.findUserById( userId );
    if ( !user ) throw userNotExist;
    if ( user.coverImagesPaths ) {
        // delete the old cover images
        user.coverImagesPaths.map( path => fs.unlinkSync( path ) )

    }
    const coverImagesPaths = filesPaths.map( ( file ) => file.path );
    const updatedUser = await userRepository.updateUserByEmail( user.email, { coverImagesPaths } )
    return updatedUser;
}

export async function getAllUsers() {
    const users = await userRepository.getAllUsers();
    if ( users.length === 0 ) throw noUsers;
    return users;
}