import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async findAll(): Promise<Shop[]> {
    return this.shopService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Shop> {
    const shop = await this.shopService.findOne(id);
    if (!shop) throw new NotFoundException('Shop not found');
    return shop;
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'coverImage', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: join(__dirname, '..', 'uploads'),
          filename: (_, file, cb) => {
            const ext = extname(file.originalname);
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueName}${ext}`);
          },
        }),
      },
    ),
  )
  async create(
    @UploadedFiles()
    files: { coverImage?: Express.Multer.File[]; gallery?: Express.Multer.File[] },
    @Body() body: Partial<Shop>,
  ): Promise<Shop> {
    const coverImage = files.coverImage?.[0]?.filename ?? undefined; // ✅ کاملاً تایپ‌سازگار
    const gallery = files.gallery?.map(f => f.filename) ?? [];

    const shopData: Partial<Shop> = {
      ...body,
      coverImage,
      gallery,
    };

    return this.shopService.create(shopData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Shop>): Promise<Shop> {
    return this.shopService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.shopService.remove(id);
    return { message: 'Deleted successfully' };
  }
}
