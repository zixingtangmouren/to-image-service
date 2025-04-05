import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Inject,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('record')
export class RecordController {
  @Inject(RecordService)
  private readonly recordService: RecordService;

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  @Get()
  findAll() {
    return this.recordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      dest: 'uploads',
    }),
  )
  uploadImage(
    @UploadedFiles() files: Express.Multer.File[],
  ): Express.Multer.File[] {
    // 返回文件数组，明确指定返回类型为 Express.Multer.File[]
    return files.map((file: Express.Multer.File): Express.Multer.File => {
      return {
        ...file,
        path:
          typeof file.path === 'string'
            ? file.path.replace('uploads', '/images')
            : '',
      };
    });
  }
}
