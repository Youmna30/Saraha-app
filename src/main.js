import express from "express";
import { config } from "dotenv";
config();
import "./common/db/mongoose.js";
import authRouter from "./app/auth/auth.route.js";
import userRouter from "./app/user/user.route.js";
import messageRouter from './app/message/message.route.js';


const app = express();
app.use( express.json() );

app.use( "/auth", authRouter );
app.use( "/user", userRouter );
app.use( "/message", messageRouter );



app.use( ( err, req, res, next ) => {
    res.json( {
        message: err.message,
        success: false,
        stack: err.stack
    } )
} )

app.listen( 3000, () => {
    console.log( "Server is running on port 3000" )

} )


