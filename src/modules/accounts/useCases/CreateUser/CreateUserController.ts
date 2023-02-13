import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { username, email, password } = request.body;

    const createUseCase = container.resolve(CreateUserUseCase);
    createUseCase.execute({ username, email, password });

    return response.status(201).send();
  }
}

export { CreateUserController };
