import { Injectable } from "@nestjs/common";


import {
  InjectWebSocketProvider,
  WebSocketClient,
  OnOpen,
  OnMessage,
  EventListener
} from 'nestjs-websocket';

import { ClientRequest, IncomingMessage } from 'http'

@Injectable()
export class SocketClient {
  private data: Record<any, any> = {}

  constructor(
    @InjectWebSocketProvider()
    private readonly ws: WebSocketClient,
  ) {}

  // @OnOpen()
  // onOpen() {
  //   console.log('Client is connected to Gateway!')
  //   this.ws.send(JSON.stringify("{event: 'events', data: 'I am new client!'}"))
  // }

  // @OnMessage()
  // message3(data: WebSocketClient.Data) {
  //   console.log('OnMessage happens')
  //   this.data = JSON.parse(data.toString())
  // }

  // @EventListener('onMessage')
  // message(data: WebSocketClient.Data) {
  //   console.log('onMessage happens')
  //   this.data = JSON.parse(data.toString())
  //   console.log(this.data)
  // }

  @EventListener('open')
  open() {
    console.log('The connection is established.')
    this.ws.send(
      JSON.stringify({
        event: 'events',
        data: 'Am newbie',
      }),
    );
  }
  
  @EventListener('events')
  customEvent(request: ClientRequest, response: IncomingMessage) {
    console.log(`customEvent`)
  }

  @EventListener('onMessage')
  onMessage(request: ClientRequest, response: IncomingMessage) {
    console.log(`onMessage`)
  }

  @EventListener('message')
  message(request: ClientRequest, response: IncomingMessage) {
    console.log(`message`)
  }


  @EventListener('ping')
  ping(data: Buffer) {
    console.log(`A ping ${data.toString()} is received from the server.`)
  }
  
  @EventListener('unexpected-response')
  unexpectedResponse(request: ClientRequest, response: IncomingMessage) {
    console.log(`The server response ${response} is not the expected one.`)
  }
  
  @EventListener('upgrade')
  upgrade(response: IncomingMessage) {
    console.log(`Response headers ${response} are received from the server as part of the handshake.`)
  }

  async getData(): Promise<Record<any, any>> {
    return this.data
  }
}