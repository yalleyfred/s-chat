import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {SocketService} from '../services/socket.service';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [MatIcon, FormsModule, NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: string[] = [];
  public newMessage = '';

  private messageSubscription: Subscription = new Subscription();

  private socketService = inject(SocketService);

  public ngOnInit() {
    this.messageSubscription.add(
      this.socketService.listen('message').subscribe((message: any) => {
        this.messages.push(message.message);
      })
    )
  }

  public sendMessage() {
    console.log('message', this.newMessage)
    if (this.newMessage.trim()) {
      this.socketService.emit('message', this.newMessage);
      this.newMessage = '';
    }

    console.log('all message', this.messages)
  }

  public ngOnDestroy() {
    this.messageSubscription.unsubscribe()
    // this.socketService.disconnect()
  }
}
