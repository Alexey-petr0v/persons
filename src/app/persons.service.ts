import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Person } from './person';
import { NotifierService } from './notifier/notifier.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private persons: Array<Person> = [];
  private subject = new BehaviorSubject(this.persons);
  private iterval = 0;
  private validationErrors: Array<string> = [];

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
    this.http.delete(environment.apiUrl + id).subscribe(data => {
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

  public createPerson(firstName: string, lastName: string): boolean {
    if ((firstName !== '') && (lastName !== '')) {
      let id = 1;
      if (this.persons.length !== 0) {
        id = this.persons[this.persons.length - 1].id + 1;
      }
      this.http.post(environment.apiUrl, {
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
      return true;
    }
    else {
      this.validationErrors = [];
      if (firstName === '') {
        this.validationErrors.push(' введите имя');
      }
      if (lastName === '') {
        this.validationErrors.push(' введите фамилию');
      }
      alert('Пожалуйста,' + this.validationErrors);
    }
    return false;
  }

  public updatePerson(id: number, firstName: string, lastName: string): boolean {
    if ((firstName !== '') && (lastName !== '')) {
      console.log('id: ' + id);
      this.http.put(environment.apiUrl + id, {
        firstName,
        lastName
      })
      .subscribe(data => {
        // console.log(data);
      },
      (error: any) => {
        this.notifierService.setOperation(error.status, 'update');
      },
      () => {
        this.notifierService.setOperation(200, 'update');
      });
      return true;
    }
    else {
      this.validationErrors = [];
      if (firstName === '') {
        this.validationErrors.push(' введите имя');
      }
      if (lastName === '') {
        this.validationErrors.push(' введите фамилию');
      }
      alert('Пожалуйста,' + this.validationErrors);
      return false;
    }
  }

  // -------- CONNECT/DISCONNECT SERVER-------- ///
  private bindPersonsFromServer(that: PersonsService): void {
    this.http.get(environment.apiUrl).subscribe((response: any) => {
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
