import { validateBody } from "../../../lib/validation/validation.js";
import { loginDTO, resetPasswordDTO, resgisterDTO, sendOtpDTO, verifyAccountDTO } from "../dto/auth.dto.js";
import { noToken } from "../errors.js";
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
        const { accessToken, refreshToken } = await authService.login( email, password );
        res.cookie( 'access_token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        } );
        res.cookie( 'refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh-token"
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
        res.status( 200 ).json( {
            message: "Password reset successfully",
            success: true
        } );
    } catch ( error ) {
        next( error );
    }
}
export async function loginWithGoogle( req, res, next ) {
    try {

        const { idToken } = req.body;
        const { accessToken, refreshToken } = await authService.loginWithGoogle( idToken );
        res.cookie( 'access_token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        } );
        res.cookie( 'refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh-token"
        } );
        res.status( 200 ).json( {
            message: " User Login Successfully",
            success: true
        } )

    } catch ( error ) {
        next( error );
    }
}
export async function refreshToken( req, res, next ) {
    try {
        const refreshToken = req.cookies?.refresh_token;
        if ( !refreshToken ) {
            throw noToken;
        }
        const accessToken = await authService.refreshToken( refreshToken );
        res.cookie( 'access_token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        } );
        res.status( 200 ).json( {
            message: "Token refreshed successfully",
            success: true
        } )
    } catch ( error ) {
        next( error );
    }

}