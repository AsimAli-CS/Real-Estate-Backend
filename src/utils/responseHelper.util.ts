import { responseName } from '../enum';
import constants from './constants.util';
class ResponseHelper {
  get2xxResponse(response: any) {
    return {
      status: true,
      name:
        response.statusCode === constants.CODE.OK
          ? responseName.ok
          : responseName.created,
      message: response.message,
      data: response.data as any,
    };
  }
  get4xxResponse(message: string | any) {
    return {
      status: false,
      name: responseName.failure,
      message: message,
      data: null as null,
    };
  }
}
export default new ResponseHelper();
