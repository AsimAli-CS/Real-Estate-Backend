import { IListing } from '../../../database/interfaces/listing.interface';
import { Listing } from '../../../database/models/listing.model';
import { BaseRepository } from '../base.repository';
import { IListingRepository } from './listing.repository.interface';

export class ListingRepository
  extends BaseRepository<IListing>
  implements IListingRepository
{
  constructor() {
    super(Listing);
  }
}
