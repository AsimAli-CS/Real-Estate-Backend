import commonUtil from '../../utils/common.util';

export class User {
  name = '';
  username = '';
  email = '';
  password = '';
  verifyToken: string;
  role = '';
  isActive = false;
  phone = '';
  gender = '';
  photo = '';
  isDeleted = false;
  sessionIds = Array<string>();
  createdAt = commonUtil.getCurrentDate();
  updatedAt = commonUtil.getCurrentDate();
}
