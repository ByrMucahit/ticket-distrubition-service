import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    logger: ['log', 'error', 'warn', 'debug'],
  };
  app.enableCors({
    ...corsOptions,
  });

  app.setGlobalPrefix('ticket-distribution-service');

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
