import { Router, Request, Response } from 'express';

import { ForgetPasswordController } from '../modules/accounts/useCases/ForgetPassword/ForgetPasswordController';
import { ResetPasswordController } from '../modules/accounts/useCases/ResetPassword/ResetPasswordController';
import { ValidateTokenController } from '../modules/accounts/useCases/ValidateToken/ValidateTokenController';
import { forgetPasswordValidation } from '../modules/accounts/validations/forgetPasswordValidation.validation';

const passwordRoutes = Router();

const forgetPasswordController = new ForgetPasswordController();
const resetPasswordUseCase = new ResetPasswordController();

passwordRoutes.post(
  '/forget-password',
  forgetPasswordValidation,
  forgetPasswordController.handler
);

passwordRoutes.patch('/reset-password/:token', resetPasswordUseCase.handler);

export { passwordRoutes };
