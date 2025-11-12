import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly repo: Repository<Shop>,
  ) {}

  async findAll(): Promise<Shop[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Shop | null> {
    return this.repo.findOneBy({ id });
  }

  async create(data: Partial<Shop>): Promise<Shop> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<Shop>): Promise<Shop> {
    const shop = await this.repo.findOneBy({ id });
    if (!shop) throw new NotFoundException('Shop not found');
    Object.assign(shop, data);
    return this.repo.save(shop);
  }

  async remove(id: number): Promise<void> {
    const shop = await this.repo.findOneBy({ id });
    if (!shop) throw new NotFoundException('Shop not found');
    await this.repo.remove(shop);
  }
}
