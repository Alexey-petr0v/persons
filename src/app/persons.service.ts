import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Person } from './person';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  persons: Array<Person> = [];
  subject = new BehaviorSubject(this.persons);
  iterval = 0;

  constructor(public http:HttpClient) {
    this.bindPersonsFromServer(this);

    let that = this;
    this.setTimer(that, () => {
      that.bindPersonsFromServer(that);
    });
  }

  private setTimer(thatObj: Object, func: Function) {
    this.iterval = setInterval((thatObj: any[]) => {return func(thatObj)}, 1000);
  }

  public removePerson(id: number) {
    this.http.delete('http://localhost:3000/persons/' + id).subscribe(data => {
      console.log(data);
    },
    (error: any) => {
    switch (error.status) {
      case 400:
        alert("Сотрудник не удален из-за технической ошибки");
        break;
      case 404:
        alert("Сотрудник не существует");
        break;
      case 500:
        alert("Сотрудник не удален из-за технической ошибки на сервере");
        break;
    }
  },
  () => {
    alert("Сотрудник успешно уданён");
  });
  }

  public getPersons(): Observable<Array<Person>> {
    return this.subject.asObservable();
  }

  public createPerson(firstName: string, lastName: string) {
    let newId: number = 1;
    if (this.persons.length !== 0) {
      newId = this.persons[this.persons.length-1].id+1;
    }
    this.http.post('http://localhost:3000/persons', {
      id: newId,
      firstName: firstName,
      lastName: lastName
    }).subscribe(data => {
      console.log(data);
    },
    (error: any) => {
      switch (error.status) {
        case 400:
          alert("Сотрудник не добавлен из-за технической ошибки");
          break;
        case 404:
          alert("Сотрудник не существует");
          break;
        case 500:
          alert("Сотрудник не добавлен из-за технической ошибки на сервере");
          break;
      }
    },
    () => {
      alert("Сотрудник успешно добавлен");
    });
  }

  public updatePerson(id: number, firstName: string, lastName: string){
    this.http.put('http://localhost:3000/persons/' + id, {
      firstName: firstName,
      lastName: lastName
    }).subscribe(data => {
      console.log(data);
    },
    (error: any) => {
      switch (error.status) {
        case 400:
          alert("Данные о сотруднике не изменены из-за технической ошибки");
          break;
        case 404:
          alert("Сотрудник не существует");
          break;
        case 500:
          alert("Данные о сотруднике не изменены из-за технической ошибки на сервере");
          break;
      }
    },
    () => {
      alert("Данные о сотруднике успешно изменены");
    });
  }

  // -------- CONNECT/DISCONNECT SERVER-------- ///
  private bindPersonsFromServer(that: PersonsService) {
    this.http.get('http://localhost:3000/persons').subscribe((response : any) => {
      that.persons = response.map(function(obj : Person) {
        let person = {id: obj.id, firstName: obj.firstName, lastName: obj.lastName};
        return person;
      });
      that.subject.next(that.persons);
    });
  }

  public disconnectServer() {
    clearInterval(this.iterval);
  }

  public connectServer() {
    let that = this;
    that.setTimer(that, function() {
      that.bindPersonsFromServer(that);
    });
  }
  // ------------------------------------ ///
}
