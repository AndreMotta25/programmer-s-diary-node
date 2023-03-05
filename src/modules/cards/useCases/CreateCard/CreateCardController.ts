import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCardUseCase } from './CreateCardUseCase';

class CreateCardController {
  async handler(request: Request, response: Response) {
    const { name, description, code, language } = request.body;
    const { id: userId } = request.user;

    const createCardUseCase = container.resolve(CreateCardUseCase);
    const id = await createCardUseCase.execute({
      name,
      description,
      code,
      language,
      userId,
    });
    return response.status(201).send(id);
  }
}

export { CreateCardController };
