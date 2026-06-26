import mongoose from 'mongoose';
import { EnvSetup } from '../utils/setEnv';

export class Database {
  protected dbUri: string;

  constructor() {
    this.dbUri = EnvSetup.dbURI!;
    this.connectDb();
  }
  private connectDb(): void {
    console.log(this.dbUri);
    const options = {
      retryWrites: true,
      autoIndex: true,
    };
    mongoose
      .connect(this.dbUri, options)
      .then(async (res) => {
        // console.log('connection established at ', this.dbUri);
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  }
}
