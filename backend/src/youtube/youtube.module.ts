import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { IYoutubeService } from './interfaces/youtube-service.interface';

@Module({
  providers: [
    {
      provide: IYoutubeService,
      useClass: YoutubeService,
    },
  ],
  controllers: [YoutubeController],
  exports: [IYoutubeService],
})
export class YoutubeModule {}
