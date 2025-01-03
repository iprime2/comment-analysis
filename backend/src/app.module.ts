import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { YoutubeModule } from './youtube/youtube.module';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { RabbitMqController } from './rabbit-mq/rabbit-mq.controller';

@Module({
  imports: [ConfigModule.forRoot(), YoutubeModule, RabbitMqModule],
  controllers: [AppController, RabbitMqController],
  providers: [AppService],
})
export class AppModule {}
