import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCardUseCase } from './UpdateCardUseCase';

class UpdateCardController {
  async handler(request: Request, response: Response) {
    const { name, description, code, language } = request.body;
    const { id } = request.params;

    const updateCardUseCase = container.resolve(UpdateCardUseCase);
    await updateCardUseCase.execute({ name, description, code, language, id });

    return response.status(204).send();
  }
}

export { UpdateCardController };
