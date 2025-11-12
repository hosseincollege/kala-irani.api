// File: src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ اجازه دسترسی Angular (لوکال + سرور Vercel)
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://kala-irani.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // ✅ فعال‌سازی اعتبارسنجی هماهنگ با DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ ارائه‌ی فایل‌های آپلود‌شده در مسیر public
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // 🚀 افزوده‌شدن prefix برای تمام مسیرهای API‌ها
  app.setGlobalPrefix('api');

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // 🎨 پیام ترمینال زیبا برای لاگ
  console.log('\x1b[36m%s\x1b[0m', `⚙️ KalaIrani API running at http://localhost:${port}`);
  console.log('\x1b[33m%s\x1b[0m', `Global prefix '/api' enabled & CORS ready for Vercel client.`);
}
bootstrap();
