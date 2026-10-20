import { model, Schema } from "mongoose";

const requestSchema = new Schema( {
    messageId: {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true
    },
    status: {
        type: String,
        enum: [ "pending", "rejected", "accepted" ],
        default: "pending"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }

    }
);
const Request = model( "Request", requestSchema );
export default Request;