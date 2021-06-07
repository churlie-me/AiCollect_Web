import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ImageConverter
{
    public base64String: string

     ConvertToBase64(files: any){
         debugger
        var file = files[0];
  
      if (file) {
          var reader = new FileReader();
  
          reader.onload =this._handleReaderLoaded.bind(this);
  
          reader.readAsBinaryString(file);
      }
    }
  
    _handleReaderLoaded(readerEvt) {
        debugger
       var binaryString = readerEvt.target.result;

       debugger
        this.base64String = btoa(binaryString);
      }

    ConvertToImage(base64string) {
        return base64string.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}