import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Client } from 'pg';

@Injectable()
export class AlertService {
  private readonly client: Client;

  constructor(@Inject('ALERT') private readonly alertClient: ClientProxy) {
    this.client = new Client({
      connectionString:
        'postgresql://postgres:123@localhost:5434/nest?schema=public',
    });
  }

  async onModuleInit() {
    await this.client.connect();
    await this.client.query('LISTEN alert_insert');
    await this.client.on('notification', async (msg) => {
      if (msg.channel === 'alert_insert') {
        console.log('Received notification:', msg.payload);
        // 여기에서 필요한 처리를 수행하세요.
        return msg.payload;
      }
    });
  }

  async sendAlertNotification(notificationData: any): Promise<void> {
    try {
      // 'alert_created' 라우팅 키와 함께 메시지를 보냄
      await this.alertClient
        .emit('alert_created', notificationData)
        .toPromise();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
