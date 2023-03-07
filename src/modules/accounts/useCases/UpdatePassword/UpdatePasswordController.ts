import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { UpdatePasswordUseCase } from './UpdatePasswordUseCase';

class UpdatePasswordController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { id } = request.user;
    const { password } = request.body;

    const updatePassword = container.resolve(UpdatePasswordUseCase);

    await updatePassword.execute({ id, password });

    return response.status(204).send();
  }
}

export { UpdatePasswordController };
