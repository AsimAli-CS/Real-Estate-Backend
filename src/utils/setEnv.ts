import dotenv from 'dotenv';
import constantsUtil from './constants.util';
dotenv.config();
export class EnvSetup {
  static dbURI: string;

  static setEnvVariables() {
    const env = process.env.environment;
    switch (env) {
      case 'local':
        this.dbURI = process.env.mongodbUri;
        break;
      // case 'dev':
      //   this.dbURI = `mongodb://${process.env.dbUsername_Dev}:${process.env.dbPassword_Dev}`;
      //   break;
      // case 'prod':
      //   this.dbURI = `mongodb://${process.env.dbUsername_Prod}:${process.env.dbPassword_Prod}`;
      //   break;
      // case 'staging':
      //   this.dbURI = `mongodb://${process.env.dbUsername_Staging}:${process.env.dbPassword_Staging}`;
      // break;
    }
  }
}
