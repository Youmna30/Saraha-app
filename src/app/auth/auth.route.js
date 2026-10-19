import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
import { checkIdempotency } from "../../lib/idempotency/idEmpotency.js";
const authRouter = Router();

authRouter.post( "/register", authController.register );
authRouter.patch( "/verify-account", authController.verifyAccount );
authRouter.post( "/login", authController.login );
authRouter.post( "/send-otp", authController.sendOtp )
authRouter.patch( "/reset-password", checkIdempotency(), authController.resetPassword );
authRouter.post( "/google-login", authController.loginWithGoogle );
authRouter.post( "/refresh-token", authController.refreshToken );

export default authRouter;