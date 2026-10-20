import { Router } from "express";
import * as requestController from "./controller/request.controller.js"
import { authGuard } from "../../lib/auth/guard.js";
const requestRouter = Router();

requestRouter.post( "/", authGuard, requestController.createRequest );
requestRouter.get( "/", authGuard, requestController.getSenderRequests );
requestRouter.patch( "/accept", authGuard, requestController.acceptRequest );
requestRouter.patch( "/reject", authGuard, requestController.rejectRequest );


export default requestRouter;
