import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent implements OnInit {

  @Input() idperson = 0;
  @Input() firstName = '';
  @Input() lastName = '';

  hideModal = 'update-person__modal_hide';

  firstNameControl = new FormControl();
  lastNameControl = new FormControl();

  private inputPattern = '[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я\\s]*$';

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
    this.firstNameControl = new FormControl(this.firstName, [Validators.required, Validators.pattern(this.inputPattern)]);
    this.lastNameControl = new FormControl(this.lastName, [Validators.required, Validators.pattern(this.inputPattern)]);
  }

  updatePerson(): void {
    if (this.personsService.updatePerson(this.idperson, this.firstNameControl.value, this.lastNameControl.value)) { this.viewModal(); }
  }

  viewModal(): void {
    if (this.hideModal === 'update-person__modal_hide') {
      this.personsService.disconnectServer();
      this.hideModal =  '';
    }
    else {
      this.personsService.connectServer();
      this.hideModal =  'update-person__modal_hide';
    }
  }
}
