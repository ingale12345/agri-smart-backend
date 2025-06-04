import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { File } from 'multer';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateShopDto) {
    return this.prisma.shop.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.shop.findMany();
  }

  async findOne(id: string) {
    return this.prisma.shop.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateShopDto, file?: File) {
    const savedFilePath = file ? file.path : null;

    return this.prisma.shop.update({
      where: { id },
      data: {
        ...dto,
        // same here, save image path if you need it
      },
    });
  }

  async remove(id: string) {
    return this.prisma.shop.delete({
      where: { id },
    });
  }
}
