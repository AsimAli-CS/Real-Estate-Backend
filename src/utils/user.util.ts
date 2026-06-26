import { compare } from 'bcryptjs';
import { UserRepository } from '../api/repository/user/user.repository';
import { IUser } from '../database/interfaces/user.interface';
import commonUtil from './common.util';
import { EnvSetup } from './setEnv';

class UserUtil {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async checkPassword(password: string) {
    const checkPass = commonUtil.checkPasswordRegex(password);
    if (!checkPass) {
      return false;
    }
    return true;
  }

  async checkUserAndComparePassword(email: string, password: string) {
    const userExist = await this.userRepository.getOne<IUser>(
      { email: email, isDeleted: false },
      '+password'
    );
    if (!userExist) return false;
    if (userExist && !(await compare(password, userExist.password))) {
      return false;
    }
    return userExist;
  }
}

export default new UserUtil();
