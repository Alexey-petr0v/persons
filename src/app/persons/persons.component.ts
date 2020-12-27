import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Person } from '../person';
import { PersonsService } from '../persons.service';
import { NotifierService } from '../notifier/notifier.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  public peoples: Array<Person> = [];
  private sub = new Subscription();

  constructor(public personsService: PersonsService, public notifierService: NotifierService) { }

  ngOnInit(): void {
    this.sub = this.personsService.observPersons().subscribe(peoples => {
      this.peoples = peoples;
      this.subs.add(this.sub);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
