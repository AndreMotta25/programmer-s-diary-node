import { Router } from 'express';

import { authRoutes } from './authenticate.routes';
import { passwordRoutes } from './password.routes';
import { userRouter } from './user.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/password', passwordRoutes);

routes.use('/sessions', authRoutes);

export { routes };
