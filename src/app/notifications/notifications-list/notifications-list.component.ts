import { Component, OnInit } from '@angular/core';
import { Command, NotificationsService } from '../notifications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit {
  messages$: Observable<Command[]>;

  constructor(private notificationsService: NotificationsService) {
    this.messages$ = this.notificationsService.messagesOutput$;
  }

  ngOnInit(): void {}

  closeMessage(messageId: number): void {
    this.notificationsService.clearMessage(messageId);
  }
}
