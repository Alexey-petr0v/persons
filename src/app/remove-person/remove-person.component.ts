import { Component, Input, OnInit } from '@angular/core';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-remove-person',
  templateUrl: './remove-person.component.html',
  styleUrls: ['./remove-person.component.scss']
})
export class RemovePersonComponent implements OnInit {
  
  @Input('idperson') idperson: number = 0;

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
  }

  removePerson() {
    console.log("idperson: "+this.idperson)
    this.personsService.removePerson(this.idperson)
  }

}
