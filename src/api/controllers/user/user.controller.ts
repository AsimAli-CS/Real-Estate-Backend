import { Request, Response } from 'express';
import UserService from '../../../api/services/user.service';
import commonUtil from '../../../utils/common.util';
import responseHelper from '../../../utils/responseHelper.util';
import constants from '../../../utils/constants.util';

class UserController {
  protected userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.createUser(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.CREATED).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.CREATED,
          data: response[1],
          message: constants.successRegisterMessage('User'),
        })
      );
    } catch (error: any) {
      console.log(error);
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const response = await this.userService.signIn(email, password);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.Messages.SIGNIN_SUCCESSFULL,
        })
      );
    } catch (error) {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.getUserById(req.params.id);
      if (!response[0]) {
        return res
          .status(constants.CODE.OK)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successFoundMessage('User'),
        })
      );
    } catch (error) {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  signOut = async (req: Request, res: Response) => {
    try {
      // console.log(req)
      const response = await this.userService.signOut(req);
      console.log(req, response);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: 'User logged out successfully!',
        })
      );
    } catch (error) {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    const response = await this.userService.getAllUsers(req);
    if (!response[0]) {
      return res
        .status(constants.CODE.OK)
        .send(responseHelper.get4xxResponse(response[1]));
    }
    return res.status(constants.CODE.OK).send(
      responseHelper.get2xxResponse({
        statusCode: constants.CODE.OK,
        data: response[1],
        message: constants.successFoundMessage('Users'),
      })
    );
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.updateUser(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successUpdateMessage('User'),
        })
      );
    } catch (error) {
      console.log(error);
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.resetPassword(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successUpdateMessage('Password'),
        })
      );
    } catch (error) {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  deleteUserById = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.deleteUserById(req.params.id);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successDeleteMessage('User'),
        })
      );
    } catch (error) {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.deleteUser(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successDeleteMessage('User'),
        })
      );
    } catch (error) {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  oauthLogin = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.oauthLogin(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.BAD_REQUEST)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successFoundMessage('User'),
        })
      );
    } catch (error) {
      console.log(error);
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };
}

export default new UserController();
