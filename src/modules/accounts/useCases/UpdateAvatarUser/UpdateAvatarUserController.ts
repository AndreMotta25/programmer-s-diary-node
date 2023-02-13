import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarUseCase from './UpdateAvatarUserUseCase';

class UpdateAvatarUserController {
  async handler(request: Request, response: Response) {
    const { file } = request;
    const { id } = request.user;

    const updateAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    updateAvatarUseCase.execute({ id, avatar: file?.filename });

    response.status(204).send();
  }
}

export default UpdateAvatarUserController;
