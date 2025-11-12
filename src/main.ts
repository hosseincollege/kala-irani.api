import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ اجازه دسترسی Angular لوکال + نسخه‌ی سرور (Vercel)
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://kala-irani.vercel.app', // فرانت سرور
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ فایل‌های آپلود‌شده (در مسیر /uploads)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // 🎨 پیام ترمینال
  console.log('\x1b[36m%s\x1b[0m', `⚙️ KalaIrani API is running at http://localhost:${port}`);
  console.log('\x1b[33m%s\x1b[0m', `CORS enabled for localhost:4200 and kala-irani.vercel.app`);
}
bootstrap();
