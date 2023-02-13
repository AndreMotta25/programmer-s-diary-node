import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

import { UserRepository } from '../modules/accounts/repositories/typeorm/UserRepository';

interface IJwtPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) throw new Error('O Token está faltando');

  const token = authorization.split(' ')[1];

  try {
    const userRepository = new UserRepository();

    const decryptedToken = jwt_decode(token) as IJwtPayload;
    const user = await userRepository.findById(decryptedToken.sub);

    if (!user) throw new Error('Usuario não achado');

    verify(token, user.hashToken) as IJwtPayload;

    // const userRepository = new UserRepository();
    // const user = await userRepository.findById(credentials.sub);

    // if (!user) throw new Error('Usuario não achado');

    request.user = { id: user.id };

    next();
  } catch {
    throw new Error('Token invalido');
  }
}

export { ensureAuthenticated };
