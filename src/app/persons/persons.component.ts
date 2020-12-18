import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Person } from '../person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  peoples = new Array();
  x = '';

  constructor(http:HttpClient) {

    function getJSON(that: PersonsComponent) {
      http.get('http://localhost:3000/persons').subscribe((response : any) => {
        that.peoples = response.map(function(obj : Person) {
          let person = new Person();
          person.id = obj.id;
          person.firstName = obj.firstName;
          person.lastName = obj.lastName;
          return person;
        });
      })
    }

    function setTimer(thatObj: Object, func: Function) {
      setInterval((thatObj: any[]) => {return func(thatObj)}, 2000);
    }
    
    getJSON(this);

    let that = this;
    setTimer(that, function() {
      console.log(that);
      getJSON(that);
    })
  }


    // console.log("this.peoples:"+this.peoples)
    // console.log("this.peoples instanceof Array: "+(this.peoples instanceof Array));
    // console.log("this.peoples[0] instanceof Person: "+(this.peoples[0] instanceof Person));
  ngOnInit(): void {
  }

}
