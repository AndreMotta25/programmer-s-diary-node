import { Router } from 'express';

import { ConfirmEmailController } from '../modules/accounts/useCases/ConfirmEmailUseCase/ConfirmEmailController';

const emailRoutes = Router();

const confirmEmailController = new ConfirmEmailController();

emailRoutes.patch('/confirm-email/:token', confirmEmailController.handler);

export { emailRoutes };
