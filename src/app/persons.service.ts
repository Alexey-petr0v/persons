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
    this.iterval = setInterval((thatObj: any[]) => {return func(thatObj)}, 2000);
  }

  public removePerson(id: number) {
    this.disconnectServer();
    this.http.delete('http://localhost:3000/persons/' + id).subscribe(data => {
      this.connectServer();
    });
  }

  public getPersons(): Observable<Array<Person>> {
    return this.subject.asObservable();
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
