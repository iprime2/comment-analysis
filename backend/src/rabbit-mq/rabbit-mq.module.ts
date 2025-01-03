import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './rabbit-mq.service';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'RABBITMQ_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://guest:guest@localhost:5672'],  // RabbitMQ connection URL
            queue: 'test_queue',  // Default queue
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
    ],
    providers: [RabbitMqService],
    exports: [RabbitMqService],
  })
export class RabbitMqModule {}
