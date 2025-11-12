import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  async register(username: string, email: string, password: string) {
    const existing = await this.usersRepo.findOne({ where: [{ username }, { email }] });
    if (existing) throw new ConflictException('این نام کاربری یا ایمیل قبلاً ثبت شده است.');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, email, password: hashed });
    await this.usersRepo.save(user);
    return { message: 'ثبت‌نام با موفقیت انجام شد' };
  }

  async login(username: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('کاربر یافت نشد');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('رمز عبور اشتباه است');

    const token = 'token_' + Date.now();
    return { user, token };
  }
}
