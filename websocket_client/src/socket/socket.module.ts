import {Module} from '@nestjs/common';
import { WebSocketModule } from 'nestjs-websocket'
import { SocketClient } from './socket-client';

@Module({
  imports: [
    WebSocketModule.forRoot({
      url: 'ws://localhost:3000',
      protocols: ['aa', 'bb'],
      options: {
        followRedirects: false,
        handshakeTimeout: 10000,
        maxPayload: 2000000,
        maxRedirects: 10,
        origin: '',
        perMessageDeflate: false,
        protocolVersion: 8,
        skipUTF8Validation: false,
      },
    }),
  ],providers: [SocketClient]})
export class SocketModule {}