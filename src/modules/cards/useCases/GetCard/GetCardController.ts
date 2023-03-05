import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetCardUseCase } from './GetCardUseCase';

class GetCardController {
  async handler(request: Request, response: Response) {
    const { id: userId } = request.user;

    const getCardUseCase = container.resolve(GetCardUseCase);
    const cards = await getCardUseCase.execute(userId);

    return response.status(200).json(cards);
  }
}

export { GetCardController };
