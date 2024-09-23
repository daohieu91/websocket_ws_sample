// import { OnModuleInit } from '@nestjs/common';
// import {
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   WsResponse
// } from '@nestjs/websockets';

// import { from, Observable } from 'rxjs';

// import { map } from 'rxjs/operators';
// import { Server } from 'ws';

// @WebSocketGateway({
//   transports: ['websocket'],
// })
// export class MyGateway implements OnModuleInit {
//   @WebSocketServer()
//   server: Server;

//   onModuleInit() {
//     this.server.on('connection', (socket) => {
//       console.log(socket.id);
//       console.log('New Client connected');
//     });
//   }

//   @SubscribeMessage('message')
//   onNewMessage(@MessageBody() body: any) {
//     console.log(body);
//     this.server.emit('message', {
//       msg: 'e',
//       content: body,
//     });
//   }

//   @SubscribeMessage('events')
//   onEvent(client: any, data: any): Observable<WsResponse<number>> {
//     console.log('event with data =',data)

//     this.server.emit('message', {
//       event: 'events',
//       data: data,
//     });

//     return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
//   }
// }


import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway()
export class MyGateway implements OnModuleInit{
  @WebSocketServer()
  server: Server;

    onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('New Client connected');
    });
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log('event with data =',data)
       this.server.emit('message', {
      event: 'events',
      data: data,
    });

    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}