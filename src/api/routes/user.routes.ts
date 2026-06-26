import { Router } from 'express';
import userController from '../controllers/user/user.controller';
import userValidate from '../../middleware/validators/user.validate';
import authorize from '../../middleware/authorize.middleware';

const router = Router();

router.post('/createUser', userValidate.createUser, userController.createUser);

router.post('/signIn', userValidate.signIn, userController.signIn);

router.get(
  '/getUserById/:id',
  authorize.validateAuth,
  userController.getUserById
);

router.get('/getAllUsers', authorize.validateAuth, userController.getAllUsers);

router.post('/logout', authorize.validateAuth, userController.signOut);

router.put(
  '/updateUser',
  authorize.validateAuth,
  userValidate.updateUser,
  userController.updateUser
);

router.put(
  '/resetPassword',
  authorize.validateAuth,
  userController.resetPassword
);

router.delete(
  '/deleteUserById/:id',
  authorize.validateAuth,
  userController.deleteUserById
);

export default router;
