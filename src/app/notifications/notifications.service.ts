import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private messagesInput$: Subject<Command>;
  messagesOutput$: Observable<Command[]>;

  constructor() {
    this.messagesInput$ = new Subject<Command>();
    this.messagesOutput$ = this.messagesInput$.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        } else if (value.type === 'success' || value.type === 'error') {
          return [...acc, value];
        }
      }, []),
    );
  }

  private static randomId(): number {
    return Math.round(Math.random() * 1000);
  }

  addSuccess(message: string): void {
    const id = NotificationsService.randomId();
    this.messagesInput$.next({
      id,
      type: 'success',
      text: message,
    });

    this.clearMessage(id, 5000);
  }

  addError(message: string): void {
    const id = NotificationsService.randomId();
    this.messagesInput$.next({
      id: NotificationsService.randomId(),
      type: 'error',
      text: message,
    });

    this.clearMessage(id, 5000);
  }

  clearMessage(id: number, msToExpire: number = 0): void {
    setTimeout(() => {
      this.messagesInput$.next({
        id,
        type: 'clear',
      });
    }, msToExpire);
  }
}
