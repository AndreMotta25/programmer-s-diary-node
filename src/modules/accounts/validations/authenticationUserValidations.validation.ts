import { body } from 'express-validator';

export const autheticationUserValidations = [
  body('identification').isString().notEmpty().withMessage('Campo obrigatorio'),
  body('password').isString().notEmpty().withMessage('Campo obrigatorio'),
];
