import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessStructedInspector } from './common/inspectors/success-structed.inspector';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalInterceptors(new SuccessStructedInspector());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
