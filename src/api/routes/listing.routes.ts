import { Router } from 'express';
import authorize from '../../middleware/authorize.middleware';
import listingController from '../controllers/user/listing.controller';

const router = Router();

router.post('/createlisting',authorize.validateAuth, listingController.createListing);
router.put('/updatelisting',authorize.validateAuth, listingController.updateListing);
router.get('/getlistingbyid/:id',authorize.validateAuth, listingController.getListingById);
router.get('/getlistings',authorize.validateAuth, listingController.getListings);
router.delete('/deletelistingbyid/:id',authorize.validateAuth, listingController.deleteListingById);

export default router;
