import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ValidadeTokenUseCase } from './ValidateTokenUseCase';

class ValidateTokenController {
  async handler(request: Request, response: Response) {
    const { token } = request.params;

    const validateTokenUseCase = container.resolve(ValidadeTokenUseCase);

    await validateTokenUseCase.execute(token);

    return response.status(201).json({ message: 'ok' });
  }
}
export { ValidateTokenController };
