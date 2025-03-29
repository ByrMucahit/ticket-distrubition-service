import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { TicketEntity } from '../ticket/ticket.entity';

@WebSocketGateway(3002, {
  cors: {
    origin: '*', // Allow all origins
  },
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(Gateway.name);

  @WebSocketServer()
  server: Server;

  constructor() {}

  handleConnection(client: Socket): any {
    this.server.emit('user-joined', {
      message: `The new user joined to chat: ${client.id}`,
    });
  }
  handleDisconnect(client: Socket): any {
    this.server.emit('user-left', { message: `User left the chat: ${client.id}` });
  }

  @SubscribeMessage('reply')
  async handleMessage(client: Socket, message: any): Promise<void> {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${message}`);

    client.emit('sale', message);
    this.server.emit('sale', message);
  }

  sendToAll(message: string) {
    this.server.emit('reply', message);
  }

  sendBoughtTicketEvent(message: TicketEntity) {
    this.server.emit('sale', message);
  }
}
