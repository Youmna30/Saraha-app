import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
import { checkIdempotency } from "../../lib/idempotency/idEmpotency.js";
import { authGuard } from '../../lib/auth/guard.js';
const authRouter = Router();

authRouter.post( "/register", authController.register );
authRouter.patch( "/verify-account", authController.verifyAccount );
authRouter.post( "/login", authController.login );
authRouter.post( "/send-otp", authController.sendOtp )
authRouter.patch( "/reset-password", checkIdempotency(), authController.resetPassword );
authRouter.post( "/google-login", authController.loginWithGoogle );
authRouter.post( "/refresh-token", authController.refreshToken );
authRouter.post( "/enable-two-step-verification", authGuard, authController.enableTwoStepVerification );
authRouter.patch( "/verify-enable-two-step-verification", authGuard, authController.verifyEnableTwoStepVerification );
authRouter.post( "/login-confirmation", authController.loginConfirmation );



export default authRouter;