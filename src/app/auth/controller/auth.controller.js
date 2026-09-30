import { validateBody } from "../../../common/validation/validation.js";
import { loginDTO, resetPasswordDTO, resgisterDTO, sendOtpDTO, verifyAccountDTO } from "../dto/auth.dto.js";
import * as authService from "../service/auth.service.js";

export async function register( req, res, next ) {
    try {
        const data = validateBody( resgisterDTO, req.body );
        const user = await authService.register( data );
        res.status( 201 ).json( {
            message: "User Created Successfully",
            success: true,
            data: user
        } );

    } catch ( error ) {
        next( error );
    }

}
export async function verifyAccount( req, res, next ) {
    try {
        const data = validateBody( verifyAccountDTO, req.body );
        const { email, code } = data;
        const updatedUser = await authService.verifyAccount( email, code );
        res.status( 200 ).json( {
            message: "User verified successfully",
            success: true,
            user: updatedUser
        } )
    } catch ( error ) {
        next( error );
    }
}
export async function login( req, res, next ) {
    try {
        const data = validateBody( loginDTO, req.body );
        const { email, password } = data;
        const token = await authService.login( email, password );
        res.cookie( 'access_token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        } );
        res.status( 200 ).json( {
            message: " User Login Successfully",
            success: true
        } )

    } catch ( error ) {
        next( error );
    }
}

export async function sendOtp( req, res, next ) {
    try {
        const data = validateBody( sendOtpDTO, req.body );
        const { email } = data;
        await authService.sendOtp( email );
        res.status( 200 ).json( {
            message: "Otp is sent successfully, please check your email",
            success: true
        } )
    } catch ( error ) {
        next( error );
    }
}
export async function resetPassword( req, res, next ) {
    try {
        const data = validateBody( resetPasswordDTO, req.body );
        const { email, code, newPassword } = data;
        await authService.resetPassword( email, code, newPassword );
        res.sendStatus( 204 );
    } catch ( error ) {
        next( error );
    }
}