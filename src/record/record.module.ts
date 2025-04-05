import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [
    DbModule.forRoot({
      path: 'record.json',
    }),
  ],
})
export class RecordModule {}
