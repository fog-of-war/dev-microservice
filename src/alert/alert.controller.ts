import { Controller, Inject } from '@nestjs/common';
import { AlertService } from './alert.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { Observable, interval, of, throwError } from 'rxjs';
import { catchError, takeWhile } from 'rxjs/operators';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {
    // interval(3000)
    //   .pipe(
    //     takeWhile(() => true), // 무한 루프로 설정
    //   )
    //   .subscribe(() => this.sendAlertEvent());
  }

  private sendAlertEvent() {
    try {
      // // 클라이언트로 전달할 데이터를 작성
      // const notificationData = { message: 'New alert created', data: {} }; // 원하는 데이터로 수정
      // // AlertService를 통해 메시지를 메시지 큐로 보냄
      // this.alertService.sendAlertNotification(notificationData);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
