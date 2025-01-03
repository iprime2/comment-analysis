import { Controller, Get } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';

@Controller('rabbitmq')
export class RabbitMqController {
constructor(private readonly rabbitmqService: RabbitMqService) {}

  @Get('send')
  async sendMessage() {
    const message = { content: 'Hello from NestJS to RabbitMQ' };
    await this.rabbitmqService.sendMessage(message);
    return 'Message sent to RabbitMQ';
  }
}
