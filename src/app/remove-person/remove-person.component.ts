import { Component, Input, OnInit } from '@angular/core';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-remove-person',
  templateUrl: './remove-person.component.html',
  styleUrls: ['./remove-person.component.scss']
})
export class RemovePersonComponent implements OnInit {
  
  @Input('idperson') idperson: number = 0;
  hideModal: string = 'remove-person__modal_hide'

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
  }

  removePerson() {
    this.personsService.removePerson(this.idperson)
    this.viewModal();
  }

  viewModal() {
    if (this.hideModal == 'remove-person__modal_hide') {
      this.personsService.disconnectServer();
      this.hideModal =  '';
    }
    else {
      this.personsService.connectServer();
      this.hideModal =  'remove-person__modal_hide';
    }
    
  }

}
