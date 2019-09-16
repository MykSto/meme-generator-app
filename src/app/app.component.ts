import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
declare const Canvas2Image: any;
import * as html2canvas from 'html2canvas';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //Creating array w/ Files uploaded
  uploadedFiles: Array<File>;

  // url use to maintain loca uploads
  url: any;

  constructor(private http: HttpClient) {
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  //Upload File to express server when Upload is clicked
  upload() {

    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.http.post('/api/upload', formData)
      .subscribe((response) => {
        console.log('response receved', response);
      })
  }

  //Display selected file in div tag
  onSelectFile(event) {
    var file = this.uploadedFiles = event.target.files;
    if (file && file[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file
      reader.onload = (event) => { // readAsDataURL is completed
        this.url = event.target.result; // *** comment before running
      }
    }
  }
  
  //Variables
  topText: string = "Top Meme Text";
  bottomText: string = "Bottom Meme Text";
  imageName: string = "Smiley Face";
  color: string = "rgb(0, 0, 0)";
  imageNameList: string[] = ["Smiley Face", "Shack to Fool", "Thik Fist", "Sandy Success Boy", "Pepe Meme"];
  imageFileNameList: string[] = ["spider-man.jpg", "shack-the.jpg", "fist-meme.jpg", "that-feeling.png", "pepe-meme.png"];

  //Shift between local pictures
  changeImage() {
    var valueOfSearch: string = "";
    for (var i = 0; i < this.imageNameList.length; i++) {
      if (this.imageNameList[i] === this.imageName) {
        valueOfSearch = this.imageFileNameList[i];
      }
    }
    var whole: string = "assets/" + valueOfSearch;
    return whole;
  }

  public ngOnInit() {

    $("#imagesDisplay").css("display", "none");
    $("#uploadDisplay").css("display", "none");
    var modeButtons = document.querySelectorAll(".mode");

    //Buttons styling
    function setupModelButtons() {
      for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
          modeButtons[0].classList.remove("selected");
          modeButtons[1].classList.remove("selected");
          modeButtons[2].classList.remove("selected");
          this.classList.add("selected");
          if (this.textContent === "Image") {
            $("#imagesDisplay").css("display", "block");
            $("#uploadDisplay").css("display", "none");
            $("img").css("display", "block");
          } else if (this.textContent === "File") {
            $("#imagesDisplay").css("display", "none");
            $("#uploadDisplay").css("display", "block");
            $("img").css("display", "block");
          } else if(this.textContent === "Reset"){
            $("img").css("display", "none");
            $("canvas").remove();
          }
        });
      }
    }

    function init() {
      generateCanvas();
      setupModelButtons();
    }

    //Canvas screenshot
    var btnSave = document.querySelector("#btnSave");
    function generateCanvas() {
      btnSave.addEventListener("click", function () {
        html2canvas(document.querySelector("#result")).then
          (function (canvas) {
            document.body.appendChild(canvas);
            $("canvas").appendTo("#img-out");
            return Canvas2Image.saveAsJPEG(canvas);
          });
      });
    }
    init();

  }

}