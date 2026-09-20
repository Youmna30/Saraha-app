import crypto from "node:crypto"

export function generateOtp() {
    const otp = crypto.randomInt( 100000, 999999 ).toString();
    return otp;
}