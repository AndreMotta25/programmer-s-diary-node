import { Router } from 'express';

import { ForgetPasswordController } from '../modules/accounts/useCases/ForgetPassword/ForgetPasswordController';
import { ResetPasswordController } from '../modules/accounts/useCases/ResetPassword/ResetPasswordController';
import { forgetPasswordValidation } from '../modules/accounts/validations/forgetPasswordValidation.validation';
import { resetPassowordValidation } from '../modules/accounts/validations/resetPassowordValidation.validation';

const passwordRoutes = Router();

const forgetPasswordController = new ForgetPasswordController();
const resetPasswordUseCase = new ResetPasswordController();

passwordRoutes.post(
  '/forget-password',
  forgetPasswordValidation,
  forgetPasswordController.handler
);

passwordRoutes.patch(
  '/reset-password/:token',
  resetPassowordValidation,
  resetPasswordUseCase.handler
);

export { passwordRoutes };
