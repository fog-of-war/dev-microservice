import { Module } from '@nestjs/common';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [AlertModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
