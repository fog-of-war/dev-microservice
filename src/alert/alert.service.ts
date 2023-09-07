import { Injectable, OnModuleInit } from '@nestjs/common';

import { Client } from 'pg';

@Injectable()
export class AlertService {
  private readonly client: Client;

  constructor() {
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
      }
    });
  }
}
