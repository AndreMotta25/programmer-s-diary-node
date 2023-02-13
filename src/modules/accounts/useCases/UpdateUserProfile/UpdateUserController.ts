import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserProfileUseCase } from './UpdateUserUseCase';

class UpdateUserProfileController {
  async handler(request: Request, response: Response) {
    const { username, email } = request.body;

    // Com a autenticação vai vir do request.user
    const { id } = request.user;

    const updateUseCase = container.resolve(UpdateUserProfileUseCase);
    updateUseCase.execute({ username, email, id });

    return response.status(204).send();
  }
}

export { UpdateUserProfileController };
