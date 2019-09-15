import { Component, OnInit  } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import * as $ from 'jquery';
declare const myTest: any;
import {FileSelectDirective, FileUploader} from 'ng2-file-upload';
const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public ngOnInit(){

  }
  
// uploader:FileUploader = new FileUploader({url:uri});
 
// attachmentList: any = [];

// constructor(){
//   this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any)=> {
//     this.attachmentList.push(JSON.parse(response));
//   }
// }



}
