import { Request } from 'express';
import { omit } from 'lodash';
import { UserRepository } from '../repository/user/user.repository';
import { IUser } from '../../database/interfaces/user.interface';
import commonUtil from '../../utils/common.util';
import constants from '../../utils/constants.util';
import constantsUtil from '../../utils/constants.util';
import { DataCopier } from '../../utils/dataCopier.util';
import { User } from '../../database/repomodels/user.repomodel';
import userUtil from '../../utils/user.util';
import TokenService from './token.service';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

class UserService {
  private userRepository: UserRepository;
  private tokenService: TokenService;

  constructor() {
    this.userRepository = new UserRepository();
    this.tokenService = new TokenService();
  }

  async createUser(req: Request): Promise<[boolean, Partial<IUser> | string]> {
    let user = null;

    // Ensure email exists and is a string
    const email =
      req.body.email && typeof req.body.email === 'string'
        ? req.body.email.toLowerCase()
        : undefined;

    // If email is undefined, return a meaningful error
    if (!email) {
      return [false, 'Email is required and must be a valid string.'];
    }

    user = await this.userRepository.getOne<IUser>({
      $or: [{ email: email }],
    });

    if (user && !user.isDeleted) {
      if (user.email === email) {
        return [false, constants.alreadyExistsMessage('Email')];
      }
    }

    if (!user) {
      req.body.email = email; // Set the email in the body after validating
      const newUser = new User();
      const validatedUser = DataCopier.copy(newUser, req.body as IUser);
      await this.userRepository.create<IUser>(validatedUser);
      user = await this.userRepository.getOne<IUser>({ email: email });
      if (!user) {
        return [false, constants.failureRegisterMessage('User')];
      }
    }

    return [true, user];
  }

  async signIn(
    email: string,
    password: string
  ): Promise<[boolean, { user: Partial<IUser>; token: string } | string]> {
    const userExist = await userUtil.checkUserAndComparePassword(
      email.toLowerCase(),
      password
    );

    if (!userExist) return [false, constants.Messages.INVALID];
    const uuid = uuidv4();
    const token = await this.tokenService.create(
      userExist._id as mongoose.Types.ObjectId,
      uuid,
      '7d'
    );
    await this.userRepository.updateById<IUser>(userExist._id.toString(), {
      sessionIds: uuid,
      updatedAt: commonUtil.getCurrentDate(),
    });
    return [
      true,
      {
        user: omit(JSON.parse(JSON.stringify(userExist)), 'password'),
        token: token,
      },
    ];
  }

  async getUserById(id: string): Promise<[boolean, IUser | string]> {
    const user = await this.userRepository.getById<IUser>(id);
    if (!user) {
      return [false, constants.notFoundMessage('User')];
    }
    return [true, user];
  }

  async getUser(email: string): Promise<[boolean, IUser | string]> {
    const user = await this.userRepository.getOne<IUser>({ email: email });
    if (!user) {
      return [false, constants.notFoundMessage('User')];
    }
    return [true, user];
  }

  async updateUser(req: Request): Promise<[boolean, IUser | string]> {
    const bodyUser = req.body as IUser;
    const reqTemp: any = req;
    const userId = reqTemp?.id;
    const user = await this.userRepository.updateByOne<IUser>(
      { _id: userId },
      { ...bodyUser, updatedAt: commonUtil.getCurrentDate() }
    );
    if (!user) {
      return [false, constants.notFoundMessage('User')];
    }
    return [true, user];
  }

  async deleteUserById(id: string): Promise<[boolean, IUser | string]> {
    const user = await this.userRepository.updateById<IUser>(id, {
      isDeleted: true,
      isActive: false,
      password: '',
      updatedAt: commonUtil.getCurrentDate(),
    });
    if (!user) {
      return [false, constants.notFoundMessage('User')];
    }
    return [true, user];
  }

  getAllUsers = async (
    req: Request
  ): Promise<[boolean, { users: IUser[]; totalUsers: number } | string]> => {
    const filters: Record<string, any> = {
      role: { $ne: 'Admin' }, // Exclude Admin users
    };
    const users = await this.userRepository.getAll<IUser>(
      filters,
      undefined,
      undefined,
      { createdAt: -1 },
      undefined,
      undefined,
      Number(req.query.page),
      Number(req.query.limit)
    );
    const count = await this.userRepository.getCount<IUser>(filters);
    if (!users.length) {
      return [false, constantsUtil.notFoundMessage('Users')];
    }
    return [true, { users: users, totalUsers: count }];
  };

  signOut = async (req: Request): Promise<[boolean, IUser[] | string]> => {
    const reqTemp: any = req;
    const userId = reqTemp?.id;

    console.log(userId);

    await this.userRepository.updateById<IUser>(userId, {
      sessionIds: null,
      updatedAt: commonUtil.getCurrentDate(),
    });

    return [true, []];
  };

  async resetPassword(req: Request): Promise<[boolean, IUser | string]> {
    const { currentPassword, newPassword } = req.body;

    const reqTemp: any = req;
    const comparePassword = await userUtil.checkUserAndComparePassword(
      reqTemp.email,
      currentPassword
    );
    if (!comparePassword) return [false, 'Invalid password!'];
    const checkPassword = await userUtil.checkPassword(newPassword);
    if (!checkPassword)
      return [false, 'New ' + constants.Messages.PASSWORD_FORMAT];
    if (currentPassword === newPassword) {
      return [false, 'Current and new password are same'];
    }
    const hashPassword = await commonUtil.hashPassword(newPassword);
    const updateUser = await this.userRepository.updateById<IUser>(reqTemp.id, {
      password: hashPassword,
      updatedAt: commonUtil.getCurrentDate(),
    });
    if (!updateUser) {
      return [false, constants.failureUpdateMessage('password')];
    }
    return [true, updateUser];
  }

  async oauthLogin(req: Request): Promise<[boolean, { user: Partial<IUser>; token: string } | string]> {
    const { email, name ,photo} = req.body;
    let userExist = await this.userRepository.getOne<IUser>({ email: email.toLowerCase() });

    if (!userExist) 
      {
        const generatedPassword = Math.random().toString(36).slice(-8); // Generate a random password
        req.body.password = generatedPassword;
        const newUser = new User();
        newUser.email = email.toLowerCase();
        newUser.name = name;
        newUser.photo = photo;
        const validatedUser = DataCopier.copy(newUser, req.body as IUser);
        userExist = await this.userRepository.create<IUser>(validatedUser);
    }

    const uuid = uuidv4();
    const token = await this.tokenService.create(
      userExist._id as mongoose.Types.ObjectId,
      uuid,
      '7d'
    );
    
    await this.userRepository.updateById<IUser>(userExist._id.toString(), {
      sessionIds: uuid,
      updatedAt: commonUtil.getCurrentDate(),
    });

    return [
      true,
      {
        user: omit(JSON.parse(JSON.stringify(userExist)), 'password'),
        token: token,
      },
    ];
  }
}

export default UserService;
