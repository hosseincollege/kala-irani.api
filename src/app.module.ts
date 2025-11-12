import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🔹 احراز هویت
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';

// 🔹 فروشگاه‌ها (Shop)
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isRender = !!process.env.RENDER; // اگر روی Render اجرا شود، این مقدار true می‌شود

        if (isRender) {
          // ✅ حالت سرور (Render - PostgreSQL)
          return {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false },
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
          };
        } else {
          // ✅ حالت لوکال (MySQL)
          return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '163264',
            database: 'kalairani_db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
          };
        }
      },
    }),

    // 🔹 ثبت Repositoryها
    TypeOrmModule.forFeature([User, Shop]),
  ],
  controllers: [AuthController, ShopController],
  providers: [AuthService, ShopService],
})
export class AppModule {}
