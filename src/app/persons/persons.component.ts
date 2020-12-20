import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Person } from '../person';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  peoples: Array<Person> = [];
  private sub = new Subscription();

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
    this.sub = this.personsService.getPersons().subscribe(peoples => {
      this.peoples = peoples;
      this.subs.add(this.sub);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
