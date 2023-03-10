import cors from 'cors';
import { Router } from 'express';

import { authRoutes } from './authenticate.routes';
import { cardRouter } from './card.routes';
import { emailRoutes } from './email.routes';
import { passwordRoutes } from './password.routes';
import { userRouter } from './user.routes';

const routes = Router();

routes.use(cors());
routes.use('/user', userRouter);
routes.use('/password', passwordRoutes);
routes.use('/card', cardRouter);
routes.use('/sessions', authRoutes);
routes.use(emailRoutes);

export { routes };
