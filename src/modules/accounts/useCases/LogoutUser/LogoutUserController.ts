import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LogoutUserUseCase } from './LogoutUserUseCase';

class LogoutUserController {
  async handler(request: Request, response: Response) {
    const { id } = request.user;
    const logoutUseCase = container.resolve(LogoutUserUseCase);

    await logoutUseCase.execute(id);

    return response.status(204).send();
  }
}

export { LogoutUserController };
