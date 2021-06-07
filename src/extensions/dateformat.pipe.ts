import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  /*transformSlash(value: any, args?: any): any {
    debugger
    return super.transform(value, "MMM/dd/yyyy");
  }
/*
  transformDate(value: any, args?: any): any {
    return super.transform(new Date(value), "MMM-dd-yyyy");
  }*/
}
