import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handler(request: Request, response: Response) {
    const { identification, password } = request.body;

    const authenticaService = container.resolve(AuthenticateUserUseCase);

    const credentials = await authenticaService.execute({
      identification,
      password,
    });

    return response.status(200).json(credentials);
  }
}

export { AuthenticateUserController };
