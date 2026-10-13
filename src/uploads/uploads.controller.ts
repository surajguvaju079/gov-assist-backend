import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('uploads')
export class UploadsController {

  constructor(private readonly uploadsService: UploadsService) { }

  @Post('document')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
      },
    }),
  )
  async uploadDocument(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 5 * 1024 * 1024
      }),
      new FileTypeValidator({
        fileType: /^(image\/jpeg|image\/png|application\|pdf)$/,
      })],
  })) file: Express.Multer.File) {
    //  return this.uploadsService.uploadDocument(file);

  }

}
