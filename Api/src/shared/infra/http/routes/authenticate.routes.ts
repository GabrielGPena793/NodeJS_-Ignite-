import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenUseCase = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenUseCase.handle)

export { authenticateRoutes };