import { Router } from "express";
const messageRouter = Router();
import * as messageController from './controller/message.controller.js';
import { authGuard } from "../../lib/auth/guard.js";

messageRouter.post( '/', messageController.createMessage );
messageRouter.post( '/public', authGuard, messageController.createMessage );
messageRouter.get( '/', authGuard, messageController.getUserMessages );
export default messageRouter;