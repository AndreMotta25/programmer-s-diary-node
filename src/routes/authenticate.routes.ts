import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { AuthenticateUserController } from '../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { LogoutUserController } from '../modules/accounts/useCases/LogoutUser/LogoutUserController';
import { ValidateTokenController } from '../modules/accounts/useCases/ValidateToken/ValidateTokenController';

const authRoutes = Router();

const authenticaUserController = new AuthenticateUserController();
const logoutUserController = new LogoutUserController();
const validateTokenController = new ValidateTokenController();

authRoutes.post('/', authenticaUserController.handler);
authRoutes.post('/validate-token/:token', validateTokenController.handler);

authRoutes.use(ensureAuthenticated);

authRoutes.patch('/logout', logoutUserController.handler);

export { authRoutes };
