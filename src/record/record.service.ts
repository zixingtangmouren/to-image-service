import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  @Inject(DbService)
  private db: DbService;

  async create(createRecordDto: CreateRecordDto) {
    const list = await this.db.read<Record>();

    await this.db.write([
      ...list,
      {
        ...createRecordDto,
        id: uuid(),
        createdAt: new Date(),
      },
    ]);

    return 'ok';
  }

  findAll() {
    return this.db.read();
  }

  async findOne(id: number) {
    const list = await this.db.read<Record>();
    return list.find((item) => item.id === id);
  }

  async remove(id: number) {
    const list = await this.db.read<Record>();
    const index = list.findIndex((item) => item.id === id);
    list.splice(index, 1);
    await this.db.write(list);
    return 'ok';
  }
}
