import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

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

  @SubscribeMessage('sub')
  async handleMessage(client: Socket, message: any): Promise<void> {
    this.logger.log(`Message received from client id: ${client.id}`);
    const json = JSON.parse(message);
    this.logger.debug(`Payload: ${json}`);

    client.emit('reply', 'this is a reply');
    this.server.emit('reply', 'broadcasting...');
  }

  sendToAll(message: string) {
    this.server.emit('sub', message);
  }
}
