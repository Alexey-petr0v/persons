import { Component, Input, OnInit } from '@angular/core';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent implements OnInit {
  
  @Input('idperson') idperson: number = 0;

  @Input('firstName') firstName: string = '';
  @Input('lastName') lastName: string = '';
  hideModal: string = 'update-person__modal_hide'

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
  }

  updatePerson() {
    this.personsService.updatePerson(this.idperson, this.firstName, this.lastName);
    this.viewModal();
  }

  viewModal() {
    if (this.hideModal == 'update-person__modal_hide') {
      this.personsService.disconnectServer();
      this.hideModal =  '';
    }
    else {
      this.personsService.connectServer();
      this.hideModal =  'update-person__modal_hide';
    }
    
  }

}
