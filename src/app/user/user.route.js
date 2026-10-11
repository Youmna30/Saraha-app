import { Router } from "express";
import { withCache } from "../../lib/cache/withCache.js";
import { uploadArrayFiles, uploadSingleFile } from "../../lib/media/multer.js";
import { allowedFiles, fileValidation } from "../../lib/media/file.validation.js";
import { authGuard } from "../../lib/auth/guard.js";
import * as userController from "./controller/user.controller.js"

const userRouter = Router();


userRouter.get( "/get-all-users", withCache(), userController.getAllUsers );
userRouter.post( "/upload-profile-picture", authGuard, uploadSingleFile( 'profile-picture' ), fileValidation(), userController.uploadProfilePicture );
userRouter.post( "/upload-cover-images", authGuard, uploadArrayFiles( 'cover-images', 3 ), userController.uploadArrayImages );
userRouter.post( "/upload-cv", authGuard, uploadSingleFile( 'cv', allowedFiles.file ), userController.uploadCv );


export default userRouter;