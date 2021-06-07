import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/services/authentication.service';
import { ArchitectComponent } from './architect/architect.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public authentication: AuthenticationService, public location: Location, public architect: ArchitectComponent)
  {

  }
}
