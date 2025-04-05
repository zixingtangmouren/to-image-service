import { Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbConfig {
  path: string;
}

@Module({})
export class DbModule {
  static forRoot(config: DbConfig) {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'DB_CONFIG',
          useValue: config,
        },
        DbService,
      ],
      exports: [DbService],
    };
  }
}
