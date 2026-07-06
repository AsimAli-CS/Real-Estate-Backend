import { Application } from 'express';
import userRouter from './user.routes';
import listingRouter from './listing.routes';

export default function setup(app: Application) {
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/listing', listingRouter);
}
