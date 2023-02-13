import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ValidadeTokenUseCase } from './ValidateTokenUseCase';

class ValidateTokenController {
  async handler(request: Request, response: Response) {
    const { token } = request.params;

    const validateTokenUseCase = container.resolve(ValidadeTokenUseCase);

    // const emailUser =
    await validateTokenUseCase.execute(token);

    // request.session.email = emailUser;

    return response.status(201).send();
  }
}
export { ValidateTokenController };
