import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './notfound.component.html',
})
export class NotFoundComponent {

  constructor(private router : Router)
  {

  }

  ngOnInit()
  {
    this.router.config
  }
}
