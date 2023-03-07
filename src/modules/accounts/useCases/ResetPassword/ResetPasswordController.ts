import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { ValidadeTokenUseCase } from '../ValidateToken/ValidateTokenUseCase';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { token } = request.params;
    const { new_password } = request.body;

    const validateTokenUseCase = container.resolve(ValidadeTokenUseCase);
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    const userId = await validateTokenUseCase.execute(token);

    await resetPasswordUseCase.execute({ password: new_password, id: userId });

    return response.status(204).send();
  }
}
export { ResetPasswordController };
