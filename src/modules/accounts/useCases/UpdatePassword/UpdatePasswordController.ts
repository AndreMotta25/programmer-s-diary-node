import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePasswordUseCase } from './UpdatePasswordUseCase';

class UpdatePasswordController {
  async handler(request: Request, response: Response) {
    const { id } = request.user;
    const { password } = request.body;

    const updatePassword = container.resolve(UpdatePasswordUseCase);

    await updatePassword.execute({ id, password });

    return response.status(204).send();
  }
}

export { UpdatePasswordController };
