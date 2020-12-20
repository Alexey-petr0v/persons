import { Component, Input, OnInit } from '@angular/core';

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

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
  }

  updatePerson(): void {
    this.personsService.updatePerson(this.idperson, this.firstName, this.lastName);
    this.viewModal();
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
