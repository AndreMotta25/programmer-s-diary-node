import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { ForgetPasswordUseCase } from './ForgetPasswordUseCase';

class ForgetPasswordController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }

    const { email } = request.body;

    const forgetPasswordUseCase = container.resolve(ForgetPasswordUseCase);

    await forgetPasswordUseCase.execute(email);

    return response.status(201).send();
  }
}
export { ForgetPasswordController };
