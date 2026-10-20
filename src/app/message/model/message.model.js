import { model, Schema } from "mongoose";

const messageSchema = new Schema( {
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 200
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAnonymous: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }

} );

const Message = model( "Message", messageSchema );

export default Message;
