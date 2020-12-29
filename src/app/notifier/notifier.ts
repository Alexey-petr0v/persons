import { BehaviorSubject } from 'rxjs';

export class Notifier {
  status: number;
  typeOperation: string;
  modNotifier = 'notifier_hide';
  text: string;
  subjectMessages = new BehaviorSubject(this);
  constructor(modNotifier: string, text: string, status: number, typeOperation: string) {
    this.status = status;
    this.typeOperation = typeOperation;
    this.modNotifier = modNotifier;
    this.text = text;
  }
}
