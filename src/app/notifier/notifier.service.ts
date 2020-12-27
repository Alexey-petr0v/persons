import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Notifier } from './notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  notifier: Notifier;
  subjectNotifier: BehaviorSubject<Notifier>;

  constructor() {
    this.notifier = new Notifier('notifier_hide', '', 0, '');
    this.subjectNotifier = new BehaviorSubject(this.notifier);
  }

  public setOperation(status: number, typeOperation: string) {
    this.notifier.status = status;
    this.notifier.typeOperation = typeOperation;

    switch (typeOperation) {
      case 'remove':
        switch (status) {
          case 200:
            this.setTextAndMod('notifier_success', 'Сотрудник удален');
            break;
          case 400:
            this.setTextAndMod('notifier_error', 'Сотрудник не удален из-за технической ошибки');
            break;
          case 404:
            this.setTextAndMod('notifier_error', 'Сотрудник не существует');
            break;
          case 500:
            this.setTextAndMod('notifier_error', 'Сотрудник не удален из-за технической ошибки на сервере');
            break;
          default:
            this.setTextAndMod('notifier_error', 'Неизвестная ошибка');
            break;
        }
        break;
      case 'create':
        switch (status) {
          case 200:
            this.setTextAndMod('notifier_success', 'Сотрудник успешно добавлен');
            break;
          case 400:
            this.setTextAndMod('notifier_error', 'Сотрудник не добавлен из-за технической ошибки');
            break;
          case 404:
            this.setTextAndMod('notifier_error', 'Сотрудник не существует');
            break;
          case 500:
            this.setTextAndMod('notifier_error', 'Сотрудник не добавлен из-за технической ошибки на сервере');
            break;
          default:
            this.setTextAndMod('notifier_error', 'Неизвестная ошибка');
            break;
        }
        break;
      case 'update':
        switch (status) {
          case 200:
            this.setTextAndMod('notifier_success', 'Данные о сотруднике успешно изменены');
            break;
          case 400:
            this.setTextAndMod('notifier_error', 'Данные о сотруднике не изменены из-за технической ошибки');
            break;
          case 404:
            this.setTextAndMod('notifier_error', 'Сотрудник не существует');
            break;
          case 500:
            this.setTextAndMod('notifier_error', 'Данные о сотруднике не изменены из-за технической ошибки на сервере');
            break;
          default:
            this.setTextAndMod('notifier_error', 'Неизвестная ошибка');
            break;
        }
        break;
    }
    this.subjectNotifier.next(this.notifier);
  }

  public observNotifier(): Observable<Notifier> {
    return this.subjectNotifier.asObservable();
  }

  private setTextAndMod(mod: string, text: string) {
    this.notifier.modNotifier = mod;
    this.notifier.text = text;
  }
}
