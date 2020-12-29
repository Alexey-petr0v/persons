import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {

  hideModal = 'create-person__modal_hide';

  firstNameControl = new FormControl;
  lastNameControl = new FormControl;

  private inputPattern = '[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я\\s]*$';
  private firstNameValidators = [Validators.pattern(this.inputPattern)];
  private lastNameValidators = [Validators.pattern(this.inputPattern)];

  private firstNameSubscribe = new Subscription;
  private lastNameSubscribe = new Subscription;

  constructor(public personsService: PersonsService) { }

  ngOnInit(): void {
    this.firstNameControl = new FormControl('', this.firstNameValidators);
    this.lastNameControl = new FormControl('', this.lastNameValidators);
    // Добавление валидатора required сразу после изменения полей
    this.firstNameSubscribe = this.firstNameControl.valueChanges.subscribe(() => {
      if (this.firstNameValidators.length < 2) {
        this.firstNameValidators.push(Validators.required);
        this.firstNameControl.setValidators(this.firstNameValidators);
      }
      this.firstNameSubscribe.unsubscribe();
    })
    this.lastNameSubscribe = this.lastNameControl.valueChanges.subscribe(() => {
      if (this.lastNameValidators.length < 2) {
        this.lastNameValidators.push(Validators.required);
        this.lastNameControl.setValidators(this.lastNameValidators);
      }
      this.lastNameSubscribe.unsubscribe();
    })
  }

  savePerson(): void {
    if (this.personsService.createPerson(this.firstNameControl.value, this.lastNameControl.value)) this.viewModal();
  }

  viewModal(): void {
    this.hideModal = this.hideModal === 'create-person__modal_hide' ? '' : 'create-person__modal_hide';
  }
}
