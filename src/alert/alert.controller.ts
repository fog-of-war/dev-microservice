import { Controller } from '@nestjs/common';
import { AlertService } from './alert.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @EventPattern('alert.created')
  alertCreated(): Observable<any> {
    // 예시: 에러 핸들링 추가
    return of({ msg: 'Hi~ I am microservice' }).pipe(
      catchError((error) => throwError('Something went wrong')),
    );
  }
}
