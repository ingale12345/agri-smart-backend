import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UploadFile } from 'src/common/decorators/upload.decorator';
import { ShopsService } from './shops.service';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopsController {
  constructor(private shopService: ShopsService) {}

  @Post()
  @UploadFile('image', 'shops') // field name = image, folder = shops
  create(@Body() dto: CreateShopDto, @UploadedFile() file: File) {
    dto.image = file || null;
    return this.shopService.create(dto);
  }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  @Put(':id')
  @UploadFile('image', 'shops')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateShopDto,
    @UploadedFile() file: File,
  ) {
    return this.shopService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }
}
