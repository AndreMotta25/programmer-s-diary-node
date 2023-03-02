import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ConfirmEmailUseCase } from './ConfirmEmailUseCase';

class ConfirmEmailController {
  async handler(request: Request, response: Response) {
    const { token } = request.params;

    const confirmUseCase = container.resolve(ConfirmEmailUseCase);

    await confirmUseCase.execute(token);

    return response.status(204).send();
  }
}

export { ConfirmEmailController };
