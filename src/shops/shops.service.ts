import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { File } from 'multer';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateShopDto) {
    try {
      const shop = await this.prisma.shop.create({
        data,
      });
      return shop;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        Logger.log(error);
        throw new ConflictException('Email Already Exists.');
      }
    }
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
    return this.prisma.shop.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.shop.delete({
      where: { id },
    });
  }
}
