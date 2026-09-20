import { model, Schema } from "mongoose"

const otpSchema = new Schema( {
    code: {
        type: String,
        length: 6,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {
            expires: 0
        }
    }

}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }

} );

const Otp = model( "Otp", otpSchema );
export default Otp;
