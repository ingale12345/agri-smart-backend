import { File } from 'multer';
export class CreateShopDto {
  name: string;
  ownerName: string;
  contact?: string;
  email: string;
  address?: string;
  image?: File;
}
