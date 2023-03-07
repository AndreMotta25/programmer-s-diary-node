import { body } from 'express-validator';

export const passwordUpdateValidation = [
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      'A senha deve conter no minimo 8 caracteres, 1 letra maiuscula e um simbolo especial'
    ),
];
