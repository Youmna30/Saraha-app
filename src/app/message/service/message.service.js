import { errorCreateMessage, noMessagesFound } from '../error.js';
import * as messageRepo from '../respository/message.repo.js';
import * as userRepo from '../../user/repository/user.repo.js';
import { userNotExist } from '../../user/errors.js';

export async function createMessage( content, receiver, sender ) {
    const userExists = await userRepo.findUserById( receiver );
    if ( !userExists ) throw userNotExist;
    const message = await messageRepo.createMessage( content, receiver, sender );
    if ( !message ) throw errorCreateMessage;
    return message;
}

export async function getUserMessages( userId ) {
    const messages = await messageRepo.getUserMessages( userId );
    if ( messages.length === 0 ) throw noMessagesFound;
    return messages;
}   