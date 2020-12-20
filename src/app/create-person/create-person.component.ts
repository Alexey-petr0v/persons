import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  hideModal: string = 'create-person__modal_hide'

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
  }

  savePerson() {
    this.personsService.createPerson(this.firstName, this.lastName);
    this.viewModal();
  }

  viewModal() {
    this.hideModal = this.hideModal == 'create-person__modal_hide' ? '' : 'create-person__modal_hide'
  }
}
