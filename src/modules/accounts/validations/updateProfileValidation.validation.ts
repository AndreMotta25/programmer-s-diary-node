import { body } from 'express-validator';

export const updateProfileValidation = [
  body('email').isEmail().withMessage('Forneça um endereço de email valido.'),
  body('username')
    .isString()
    .withMessage('O username é obrigatorio')
    .isLength({ min: 5 })
    .withMessage('O username deve ter no minimo 5 caracteres'),
];
