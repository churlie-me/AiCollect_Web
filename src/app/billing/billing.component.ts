import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { Config } from 'src/settings/config';
import { Billing } from 'src/models/Billing';
import { Guid } from 'guid-typescript';
import { PaymentStatus } from 'src/enums/enums';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent {
  public bills: Array<Billing>;
  public paymentStatuses = PaymentStatus
  public client_ID: number

  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.client_ID = params['Id']
    });
    debugger;

    if(!this.client_ID)
      this.httpClient.get(this.config.REST_API_SERVICE + "/billing").subscribe(data => {
        debugger;
        let json = JSON.stringify(data);
        this.bills = <Array<Billing>>JSON.parse(json);
      });
    else
      this.httpClient.get(this.config.REST_API_SERVICE + "/billing/client/ "+this.client_ID).subscribe(data => {
        debugger;
        let json = JSON.stringify(data);
        this.bills = <Array<Billing>>JSON.parse(json);
      });
  }

  OnSubmit(data) {
    debugger;
    var billing = new Billing();
    billing.guid = Guid.create().toString()
    billing.Bill = data.Bill;
    billing.BillingDate = new Date
    

    debugger;
    let json = JSON.stringify(billing);
    
    this.httpClient.post(this.config.REST_API_SERVICE + "/billing", json).subscribe(data => {
      debugger;
    });
  }
}
