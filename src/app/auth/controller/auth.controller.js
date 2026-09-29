import * as authService from "../service/auth.service.js";

export async function register( req, res, next ) {
    try {
        const user = await authService.register( req.body );
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
        const { email, code } = req.body;
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
        const { email, password } = req.body;
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
        const { email } = req.body;
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
        const { email, code, newPassword } = req.body;
        await authService.resetPassword( email, code, newPassword );
        res.sendStatus( 204 );
    } catch ( error ) {
        next( error );
    }
}