import commonUtil from '../../utils/common.util';

export class Listing {
  name = '';
  description = '';
  address = '';
  regularPrice = 0;
  discountPrice = 0;
  bedrooms = 0;
  bathrooms = 0;
  furnished = false;
  parking = false;
  type = '';
  offer = false;
  imageUrls = Array<string>();
  userId = '';
  isDeleted = false;
  createdAt = commonUtil.getCurrentDate();
  updatedAt = commonUtil.getCurrentDate();
}
