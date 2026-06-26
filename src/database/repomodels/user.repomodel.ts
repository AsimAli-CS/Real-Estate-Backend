import commonUtil from '../../utils/common.util';

export class User {
  name = '';
  email = '';
  password = '';
  verifyToken: string;
  role = '';
  isActive = false;
  phone = '';
  gender = '';
  isDeleted = false;
  sessionIds = Array<string>();
  createdAt = commonUtil.getCurrentDate();
  updatedAt = commonUtil.getCurrentDate();
}
