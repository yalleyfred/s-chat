import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000/')
  }

  public listen(eventName: string): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: string) => {
        subscriber.next(data)
      })
    })
  }

  public emit(eventName: string, data: string): void {
    this.socket.emit(eventName, data)
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}
