import { Router } from 'express';
import multer from 'multer';

import { fileFilter as filter, upload } from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController';
import { GetUserController } from '../modules/accounts/useCases/GetUser/GetUserController';
import UpdateAvatarUserController from '../modules/accounts/useCases/UpdateAvatarUser/UpdateAvatarUserController';
import { UpdatePasswordController } from '../modules/accounts/useCases/UpdatePassword/UpdatePasswordController';
import { UpdateUserProfileController } from '../modules/accounts/useCases/UpdateUserProfile/UpdateUserController';
import { passwordUpdateValidation } from '../modules/accounts/validations/updatePasswordValidation.validation';
import { updateProfileValidation } from '../modules/accounts/validations/updateProfileValidation.validation';
import { userCreateValidation } from '../modules/accounts/validations/userCreateValidation.validation';

const multerConfig = multer({
  storage: upload('./avatar').storage,
  fileFilter: filter,
});

const userRouter = Router();

const createUserController = new CreateUserController();
const updateUserProfileController = new UpdateUserProfileController();
const updateAvatarController = new UpdateAvatarUserController();
const updatePasswordController = new UpdatePasswordController();

const getUserController = new GetUserController();

userRouter.post('/', userCreateValidation, createUserController.handler);

userRouter.use(ensureAuthenticated); // middleware

userRouter.get('/', getUserController.handler);

userRouter.put(
  '/profile-update',
  updateProfileValidation,
  updateUserProfileController.handler
);

userRouter.patch(
  '/password-update',
  passwordUpdateValidation,
  updatePasswordController.handler
);

userRouter.patch(
  '/avatar',
  multerConfig.single('avatar'),
  updateAvatarController.handler
);

export { userRouter };
