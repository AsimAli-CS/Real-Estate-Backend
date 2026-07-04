import { NextFunction, Request, Response } from 'express';
import constants from '../../utils/constants.util';
import responseHelper from '../../utils/responseHelper.util';
import { responseName, Gender } from '../../enum/index';
import Joi from 'joi';

class UserRequests {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      username: Joi.string().required(),
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
      gender: Joi.string().valid(...Object.values(Gender)),
    });
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(
          responseHelper.get4xxResponse(
            error.details[0].context.label + constants.Messages.INVALID_FIELD
          )
        );
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      photo: Joi.string(),
    });
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(
          responseHelper.get4xxResponse(
            error.details[0].context.label + constants.Messages.INVALID_FIELD
          )
        );
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      // password: Joi.string().regex(
      //   constants.passwordRegex,
      //   constants.Messages.PASSWORD_FORMAT
      // ),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(
          responseHelper.get4xxResponse(
            error.details[0].context.label + constants.Messages.INVALID_FIELD
          )
        );
    }
  }

  async verifySenderIdentity(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      url: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(
          responseHelper.get4xxResponse(
            error.details[0].context.label + constants.Messages.INVALID_FIELD
          )
        );
    }
  }

  async thirdPartySignIn(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      platform: Joi.string(),
      phone: Joi.string().pattern(/^\d{10}$/),
    });
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(
          responseHelper.get4xxResponse(
            error.details[0].context.label + constants.Messages.INVALID_FIELD
          )
        );
    }
  }
}
export default new UserRequests();
