import { email, z } from "zod";

export const resgisterDTO = z.object( {
    email: z.email( "Email is required" ).toLowerCase().trim(),
    name: z.string( "Name is required" ).min( 3 ).max( 20 ).trim(),
    password: z.string( "Password is required" ).min( 8 ).max( 16 ).trim(),
    dob: z.date().optional(),
    gender: z.enum( [ "male", "female" ] ).optional()
} )

export const loginDTO = z.object( {
    email: z.email( "Email is required" ).toLowerCase().trim(),
    password: z.string( "Password is required" ).min( 8 ).max( 16 ).trim()
} )

export const verifyAccountDTO = z.object( {
    email: z.email( "Email is required" ).toLowerCase().trim(),
    code: z.string( "Code is required" ).length( 6 ).trim()
} )

export const sendOtpDTO = z.object( {
    email: z.email( "Email is required" ).toLowerCase().trim()
} )

export const resetPasswordDTO = z.object( {
    email: z.email( "Email is required" ).toLowerCase().trim(),
    code: z.string( "Code is required" ).length( 6 ).trim(),
    newPassword: z.string( "New password is required" ).min( 8 ).max( 16 ).trim()
} )