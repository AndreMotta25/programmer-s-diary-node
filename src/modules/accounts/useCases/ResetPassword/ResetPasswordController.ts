import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ValidadeTokenUseCase } from '../ValidateToken/ValidateTokenUseCase';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  async handler(request: Request, response: Response) {
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
