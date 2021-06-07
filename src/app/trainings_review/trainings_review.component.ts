import { Component } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Questionaire } from 'src/models/Questionaire';
import { Config } from 'src/settings/config';
import { Certification } from 'src/models/Certification';
import { FieldInspection } from 'src/models/FieldInspection';
import { Statuses, DataTypes } from 'src/enums/enums';
import { Report } from 'src/models/Report';
import { Question } from 'src/models/Question';
import * as XLSX from 'xlsx';
import { EnumList } from 'src/models/EnumList';
declare let $ : any;

@Component({
  selector: 'trainigs_review',
  templateUrl: './trainings_review.component.html'
})
export class TrainingsReviewComponent {
  currentCount = 0
  reports: Report[]
  Id: string
  report: Report
  statuses = Statuses
  dataTypes = DataTypes
  filename: string
  products: EnumList
  configuration_Id: string

  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Id = params["Id"];
      this.configuration_Id = params["Configuration_Id"]
    })

    this.httpClient.get(this.config.REST_API_SERVICE + "/training/reports/" + this.configuration_Id).subscribe(data => {
      let json = JSON.stringify(data)
      this.reports = <Report[]>JSON.parse(json)
    },
    error => console.log(error))
  }

  ExportExcel(): void
  {
    this.filename = Date.now().toString() + ".xls"
      /* table id is passed over here */
      let element = document.getElementById('trainings_overview');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.filename);
  }

  ExportCsv() {
    $("#trainings_overview").tableToCSV();
  }
}
