import { Component } from '@angular/core';
import { PersonsService } from './persons.service';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PersonsService, NotifierService]
})
export class AppComponent {
}
