import { Inject, Injectable } from '@nestjs/common';
import { DbConfig } from './db.module';
import { resolve } from 'path';
import { readFile, writeFile, access } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('DB_CONFIG')
  private readonly config: DbConfig;

  async read<T>(): Promise<T[]> {
    const { path } = this.config;
    const dbPath = resolve(__dirname, path);

    try {
      await access(dbPath);
    } catch {
      return [];
    }

    try {
      const data = await readFile(dbPath, 'utf-8');
      return JSON.parse(data) as T[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async write(data: any) {
    const { path } = this.config;
    const dbPath = resolve(__dirname, path);
    try {
      await writeFile(dbPath, JSON.stringify(data), 'utf-8');
    } catch (error) {
      console.error(error);
    }
  }
}
