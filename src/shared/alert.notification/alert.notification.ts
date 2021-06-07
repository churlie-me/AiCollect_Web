import { Component, ElementRef, Injectable, Input, ViewChild } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'ng-question',
  templateUrl: './alert.notification.html'
})
export class Alert {
  @ViewChild("info") info : ElementRef
  @Input()
  header: any;

  @Input()
  message: any;

  constructor(private domSanitizer: DomSanitizer) {
    this.info.nativeElement.click()
  }
}
