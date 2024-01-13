import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Query,
  // Get,
  // Param,
  // Res,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { editFileName, imageFileFilter } from './upload.utils'
// import { Response } from 'express';
import { FileService } from './file.service'
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
// import { readFileSync } from 'fs';
@Controller('/api/v1/file')
@ApiTags('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('image', {
      // storage: diskStorage({
      //   destination: './files',
      //   filename: editFileName,
      // }),
      // fileFilter: imageFileFilter,
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )

  //swagger
  @ApiHeader({
    name: 'X-access-token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  //
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('b') bucket: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: editFileName(file),
      Body: file.buffer,
    }

    return this.fileService.uploadToS3(params)
  }

  @Delete('/image')
  @ApiOperation({ summary: 'Upload file' })
  async deleteImage(
    @Query('b') bucket: string,
    @Query('name') fileName: string,
  ) {
    return this.fileService.deleteFileFromS3(bucket, fileName)
  }
}
