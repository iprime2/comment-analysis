import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMqService {
    constructor(
        @Inject('RABBITMQ_SERVICE') private client: ClientProxy, // Injecting the RabbitMQ client
      ) {}
    
      // Sending a message to RabbitMQ
      async sendMessage(message: any) {
        return this.client.send<string>('test_queue', message);
      }
    
      // Receiving a message (example of handling an event in RabbitMQ)
      // You will need to handle this in a specific controller (e.g., for consuming a message)
    
}
