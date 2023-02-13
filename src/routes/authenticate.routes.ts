import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { AuthenticateUserController } from '../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { LogoutUserController } from '../modules/accounts/useCases/LogoutUser/LogoutUserController';

const authRoutes = Router();

const authenticaUserController = new AuthenticateUserController();
const logoutUserController = new LogoutUserController();

authRoutes.post('/', authenticaUserController.handler);

authRoutes.use(ensureAuthenticated);
authRoutes.patch('/logout', logoutUserController.handler);

export { authRoutes };
