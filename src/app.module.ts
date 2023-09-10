import { Module } from '@nestjs/common';
import { AlertModule } from './alert/alert.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AlertModule,
    ClientsModule.register([{ name: 'ALERT', transport: Transport.TCP }]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
