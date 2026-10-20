import { Router } from "express";
const conversationRouter = Router();
import * as conversationController from './controller/conversation.controller.js';
import { authGuard } from "../../lib/auth/guard.js";

conversationRouter.get( '/', authGuard, conversationController.getConversation );
conversationRouter.post( '/', authGuard, conversationController.createMessageInsideConversation );


export default conversationRouter;