import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

import AppError from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/typeorm/UserRepository';

interface IJwtPayload {
  subject: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('O Token está faltando', 400);

  const token = authorization.split(' ')[1];

  try {
    const userRepository = new UserRepository();

    const decryptedToken = jwt_decode(token) as IJwtPayload;
    const user = await userRepository.findById(decryptedToken.subject);

    if (!user) throw new AppError('Usuario não achado', 403);

    verify(token, user.hashToken) as IJwtPayload;

    request.user = { id: user.id };

    next();
  } catch {
    throw new AppError('Token invalido', 401);
  }
}

export { ensureAuthenticated };
