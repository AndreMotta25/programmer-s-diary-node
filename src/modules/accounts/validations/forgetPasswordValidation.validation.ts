import { body } from 'express-validator';

export const forgetPasswordValidation = [
  body('email')
    .isString()
    .withMessage('O endereço de email é obrigatorio')
    .isEmail()
    .withMessage('Forneça um endereço de email valido.'),
];
