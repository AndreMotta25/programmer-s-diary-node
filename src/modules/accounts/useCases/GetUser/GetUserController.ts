import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserUseCase } from './GetUserUseCase';

class GetUserController {
  async handler(request: Request, response: Response) {
    const { id } = request.user;
    const getUseCase = container.resolve(GetUserUseCase);

    const user = await getUseCase.execute(id);

    return response.status(200).json(user);
  }
}

export { GetUserController };
