import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🔹 مربوط به احراز هویت
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';

// 🔹 مربوط به فروشگاه‌ها (Shop)
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

// ⚙️ تنظیمات اصلی ماژول NestJS
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '163264', // رمز دیتابیس MySQL خودت
      database: 'kalairani_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // موقع توسعه روشن باشد
    }),

    // 🔹 ثبت Repositoryها برای Auth و Shop
    TypeOrmModule.forFeature([User, Shop]),
  ],
  controllers: [AuthController, ShopController],
  providers: [AuthService, ShopService],
})
export class AppModule {}
