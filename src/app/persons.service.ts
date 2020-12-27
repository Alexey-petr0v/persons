import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Person } from './person';
import { NotifierService } from './notifier/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private persons: Array<Person> = [];
  private subject = new BehaviorSubject(this.persons);
  private iterval = 0;

  constructor(public http: HttpClient, public notifierService: NotifierService) {
    this.bindPersonsFromServer(this);
    const that = this;
    this.setTimer(() => {
      that.bindPersonsFromServer(that);
    });
  }

  private setTimer(func: () => void): void {
    this.iterval = window.setInterval(() => func(), 1000);
  }

  public removePerson(id: number): void {
    this.http.delete('http://localhost:3000/persons/' + id).subscribe(data => {
      // console.log(data);
    },
    (error: any) => {
      this.notifierService.setOperation(error.status, 'remove');
  },
  () => {
    this.notifierService.setOperation(200, 'remove');
  });
  }

  public observPersons(): Observable<Array<Person>> {
    return this.subject.asObservable();
  }

  public createPerson(firstName: string, lastName: string): void {
    let id = 1;
    if (this.persons.length !== 0) {
      id = this.persons[this.persons.length - 1].id + 1;
    }
    this.http.post('http://localhost:3000/persons', {
      id,
      firstName,
      lastName
    }).subscribe(data => {
      // console.log(data);
    },
    (error: any) => {
      this.notifierService.setOperation(error.status, 'create');
    },
    () => {
      this.notifierService.setOperation(200, 'create');
    });
  }

  public updatePerson(id: number, firstName: string, lastName: string): void {
    this.http.put('http://localhost:3000/persons/' + id, {
      firstName,
      lastName
    }).subscribe(data => {
      // console.log(data);
    },
    (error: any) => {
      this.notifierService.setOperation(error.status, 'update');
    },
    () => {
      this.notifierService.setOperation(200, 'update');
    });
  }

  // -------- CONNECT/DISCONNECT SERVER-------- ///
  private bindPersonsFromServer(that: PersonsService): void {
    this.http.get('http://localhost:3000/persons').subscribe((response: any) => {
      if (JSON.stringify(that.persons) !== JSON.stringify(response)) {
        that.persons = response.map((obj: Person) => {
          const person = {id: obj.id, firstName: obj.firstName, lastName: obj.lastName};
          return person;
        });
        that.subject.next(that.persons);
      }
    });
  }

  public disconnectServer(): void {
    clearInterval(this.iterval);
  }

  public connectServer(): void {
    const that = this;
    that.setTimer(() => {
      that.bindPersonsFromServer(that);
    });
  }
  // ------------------------------------ ///
}
