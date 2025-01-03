import { Controller, Get, Inject, Query } from '@nestjs/common';
import { GetCommentsDto } from './dto/get-comments.dto';
import { IYoutubeService } from './interfaces/youtube-service.interface';

@Controller('youtube')
export class YoutubeController {
  constructor(
    @Inject(IYoutubeService) private youtubeService: IYoutubeService
  ) {}

  @Get('comments')
  async getComments(@Query('videoId') videoId: GetCommentsDto) {
    return this.youtubeService.fetchComments(videoId);
  }
}
