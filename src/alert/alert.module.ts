import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AlertController],
  providers: [AlertService],
  imports: [
    ClientsModule.register([{ name: 'ALERT', transport: Transport.TCP }]),
  ],
})
export class AlertModule {}
