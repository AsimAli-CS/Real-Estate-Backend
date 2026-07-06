import { Router } from 'express';
import authorize from '../../middleware/authorize.middleware';
import listingController from '../controllers/user/listing.controller';

const router = Router();

router.post('/createlisting',authorize.validateAuth, listingController.createListing);
router.put('/updatelisting',authorize.validateAuth, listingController.createListing);
router.get('/getlistingbyid/:id',authorize.validateAuth, listingController.createListing);
router.get('/getlistings',authorize.validateAuth, listingController.createListing);
router.delete('/deletelistingbyid/:id',authorize.validateAuth, listingController.createListing);

export default router;
