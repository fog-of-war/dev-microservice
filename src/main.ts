import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 5001,
      },
    },
  );
  console.log('😘 Microservice is running');
  // await app.startAllMicroServices();
  await app.listen();
}
bootstrap();
