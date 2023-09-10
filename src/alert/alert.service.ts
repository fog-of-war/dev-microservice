import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

import { Client } from 'pg';

@Injectable()
export class AlertService {
  private readonly client: Client;

  constructor() {
    // @Inject('ALERT') private readonly alertClient: ClientProxy
    this.client = new Client({
      connectionString:
        'postgresql://postgres:123@localhost:5434/nest?schema=public',
    });
  }
  @EventPattern('alert_viewed')
  async onModuleInit() {
    await this.client.connect();
    await this.client.query('LISTEN alert_insert');
    await this.client.on('notification', async (msg) => {
      if (msg.channel === 'alert_insert') {
        console.log('Received notification:', msg.payload);
        // 여기에서 필요한 처리를 수행하세요.
        await this.sendAlertNotification(msg.payload); // 주기적으로 알림을 보내는 메서드 호출
        return msg.payload;
      }
    });
  }

  async sendAlertNotification(notificationData: any): Promise<any> {
    try {
      console.log('sendAlertNotification');
      return {
        msg: notificationData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
