import { HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root',
})
export class Config {
  //public REST_API_SERVICE: string = "http://137.135.91.163/service/api";
  public REST_API_SERVICE: string = "http://localhost/aicollect.api/api";
  public headers : HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  constructor(){}
}
