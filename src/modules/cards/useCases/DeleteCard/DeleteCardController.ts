import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCardUseCase } from './DeleteCardUseCase';

class DeleteCardController {
  async handler(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCardUseCase = container.resolve(DeleteCardUseCase);
    await deleteCardUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteCardController };
