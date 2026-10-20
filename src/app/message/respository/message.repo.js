import Message from '../model/message.model.js';

export async function createMessage( content, receiver, sender, isAnonymous = true ) {

    return await Message.create( { content, receiver, sender } );

}

export async function getUserMessages( userId ) {
    const messages = await Message.find( { receiver: userId, isDeleted: false }, {}, { populate: { path: 'sender', select: 'name email' } } );
    return messages.map( message => {
        const result = message.toObject();

        if ( result.isAnonymous ) {
            delete result.sender;
        }

        return result;
    } );
}
export async function changeMessageIdentity( messageId ) {
    return await Message.findByIdAndUpdate( messageId, { isAnonymous: false }, { returnDocument: "after" } );
}

export async function getMessageById( messageId ) {
    return await Message.findById( messageId );
}