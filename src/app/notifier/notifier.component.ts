import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotifierService } from './notifier.service';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {
  private subs = new Subscription();
  private sub = new Subscription();

  public text = '';
  public modNotifier = 'notifier_hide';

  constructor(public notifierService: NotifierService) { }

  ngOnInit(): void {
    this.sub = this.notifierService.observNotifier().subscribe(notifier => {
      this.text = notifier.text;
      this.modNotifier = notifier.modNotifier;
      this.subs.add(this.sub);
    });
  }

  closeNotifier(): void {
    this.modNotifier =  'notifier_hide';
  }
}
