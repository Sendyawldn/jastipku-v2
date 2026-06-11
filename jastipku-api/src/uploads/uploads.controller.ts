import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(JwtGuard)
  @Get('presigned-url')
  async getPresignedUrl(
    @Query('filename') filename: string,
    @Query('contentType') contentType: string,
  ) {
    return this.uploadsService.getPresignedUrl(filename, contentType);
  }
}
