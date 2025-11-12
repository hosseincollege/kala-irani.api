import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ اجازه اتصال Angular از 4200
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // ✅ امنیت ورودی‌ها
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ پوشه‌ی آپلودها برای فایل‌های عکس و گالری‌ها
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // 🎨 پیام مخصوص ترمینال بک‌اند (زرد تا راحت تشخیص بدی)
  console.log('\x1b[33m%s\x1b[0m', `⚙️  Backend (NestJS) • KalaIrani API`);
  console.log('\x1b[32m%s\x1b[0m', `🚀 Running • http://localhost:${port}`);
  console.log('\x1b[36m%s\x1b[0m', `📂 Serving static files → /uploads`);
}
bootstrap();
