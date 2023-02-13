import { body } from 'express-validator';

export const userCreateValidation = [
  body('email').isEmail().withMessage('Forneça um endereço de email valido.'),
  body('username')
    .isString()
    .withMessage('O username é obrigatorio')
    .isLength({ min: 5 })
    .withMessage('O username deve ter no minimo 5 caracteres'),
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
