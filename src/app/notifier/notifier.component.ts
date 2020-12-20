import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PersonsService } from '../persons.service';
import { Notifer } from './notifer';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {

  private subs = new Subscription();
  notifer: Notifer = {type: '', text: ''};
  private sub = new Subscription();

  @Input() text = '';

  modNotifer = 'notifier_hide';


  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
    this.sub = this.personsService.getMessage().subscribe(notifer => {
      this.notifer = notifer;
      this.text = notifer.text;
      if (notifer.type === 'success') {
        this.modNotifer = 'notifier_success';
      }
      else if (notifer.type === 'error') {
        this.modNotifer = 'notifier_error';
      }
      else if (notifer.type === 'hide') {
        this.modNotifer = 'notifier_hide';
      }
      this.subs.add(this.sub);
    });
  }

  closeNotifer(): void {
    this.modNotifer =  'notifier_hide';
  }

}
