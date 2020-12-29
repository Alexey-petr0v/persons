import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { RemovePersonComponent } from './remove-person/remove-person.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { NotifierComponent } from './notifier/notifier.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    RemovePersonComponent,
    CreatePersonComponent,
    UpdatePersonComponent,
    NotifierComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
