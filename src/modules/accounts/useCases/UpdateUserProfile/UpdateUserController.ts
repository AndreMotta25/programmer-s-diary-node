import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { UpdateUserProfileUseCase } from './UpdateUserUseCase';

class UpdateUserProfileController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { username, email } = request.body;

    const { id } = request.user;

    const updateUseCase = container.resolve(UpdateUserProfileUseCase);
    await updateUseCase.execute({ username, email, id });

    return response.status(204).send();
  }
}

export { UpdateUserProfileController };
