import { Request } from 'express';
import { ListingRepository } from '../repository/listing/listing.repository';
import { IListing } from '../../database/interfaces/listing.interface';
import commonUtil from '../../utils/common.util';
import constants from '../../utils/constants.util';
import constantsUtil from '../../utils/constants.util';
import { DataCopier } from '../../utils/dataCopier.util';
import { Listing } from '../../database/repomodels/listing.repomodel';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

class ListingService {
  private listingRepository: ListingRepository;

  constructor() {
    this.listingRepository = new ListingRepository();
  }

  async createlisting(req: Request): Promise<[boolean, Partial<IListing> | string]> {
    const reqTemp: any = req;
    const userId = reqTemp?.id;

    const newListing = new Listing();
    const validatedListing = DataCopier.copy(newListing, req.body as IListing);
    validatedListing.userId = userId;
    const createdListing = await this.listingRepository.create<IListing>(validatedListing);
    return [true, createdListing];
  }

  async updateListing(req: Request): Promise<[boolean, Partial<IListing> | null | string]> {
    const reqTemp: any = req;
    const userId = reqTemp?.id;
    const listingId = req.params.id;

    const existingListing = await this.listingRepository.getOne<IListing>({
      _id: listingId,
      userId: userId,
      isDeleted: false,
    });

    if (!existingListing) {
      return [false, constants.notFoundMessage('Listing')];
    }

    const updatedListingData = DataCopier.copy(existingListing, req.body as IListing);
    
    const updatedListing = await this.listingRepository.updateById<IListing>(
      listingId,
      updatedListingData
    );

    return [true, updatedListing];
  }

  async getListingById(req: Request): Promise<[boolean, Partial<IListing> | null | string]> {
    const reqTemp: any = req;
    const userId = reqTemp?.id;
    const listingId = req.params.id;
    const existingListing = await this.listingRepository.getOne<IListing>({
      _id: listingId,
      userId: userId,
      isDeleted: false,
    });

    if (!existingListing) {
      return [false, constants.notFoundMessage('Listing')];
    }

    return [true, existingListing];
  }

  async getListings(req: Request): Promise<[boolean, Partial<IListing>[] | string]> {
    const reqTemp: any = req;
    const userId = reqTemp?.id;

    const listings = await this.listingRepository.getAll<IListing>({
      userId: userId,
      isDeleted: false,
    });

    return [true, listings];
  }

  async getAllListings(req: Request): Promise<[boolean, Partial<IListing>[] | string]> {
    const reqTemp: any = req;
    const userId = reqTemp?.id;

    const listings = await this.listingRepository.getAll<IListing>({
      userId: userId,
      isDeleted: false,
    });

    return [true, listings];
  }

  async deleteListingById(req: Request): Promise<[boolean, string]> {

    const reqTemp: any = req;
    const userId = reqTemp?.id;
    const listingId = req.params.id;

    const existingListing = await this.listingRepository.getOne<IListing>({
      userId:userId,
      _id: listingId,
      isDeleted: false,
    });

    if (!existingListing) {
      return [false, constants.notFoundMessage('Listing')];
    }

    await this.listingRepository.updateById<IListing>(listingId, { isDeleted: true });

    return [true, constants.successDeleteMessage('Listing')];
  }

}

export default ListingService;
