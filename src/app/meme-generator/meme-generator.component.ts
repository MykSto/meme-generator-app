import { Component, OnInit, Injectable } from '@angular/core';
import * as $ from 'jquery';
import * as html2canvas from 'html2canvas';
declare const Canvas2Image: any;
// import {FileSelectDirective, FileUploader} from 'ng2-file-upload';
// const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.css']
})

@Injectable()

export class MemeGeneratorComponent implements OnInit {

  topText: string = "Top Meme Text";
  bottomText: string = "Bottom Meme Text";
  imageName: string = "Smiley Face";
  color: string = "rgb(0, 0, 0)";
  imageNameList: string[] = ["Smiley Face", "Shack to Fool", "Thik Fist", "Sandy Success Boy", "Pepe Meme"];
  imageFileNameList: string[] = ["spider-man.jpg", "shack-the.jpg", "fist-meme.jpg", "that-feeling.png", "pepe-meme.png"];

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

  //TODO: perhaps needed to be removed
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  public ngOnInit() {

    $("#imagesDisplay").css("display", "none");
    $("#uploadDisplay").css("display", "none");
    var modeButtons = document.querySelectorAll(".mode");

    function setupModelButtons() {
      for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
          modeButtons[0].classList.remove("selected");
          modeButtons[1].classList.remove("selected");
          this.classList.add("selected");
          if (this.textContent === "Image") {
            $("#imagesDisplay").css("display", "block");
            $("#uploadDisplay").css("display", "none");
          } else if (this.textContent === "Upload") {
            $("#imagesDisplay").css("display", "none");
            $("#uploadDisplay").css("display", "block");
          }
        });
      }
    }
    setupModelButtons();

    function init() {
      generateCanvas();
      // loopMemes();
    }

    //Meme pictures for loop
    // function loopMemes() {
    //   for (let i = 1; i <= 10; i++) {
    //     this.imageFileNameList.push(`Memes: ${i}`);
    //   }
    // }

    //Canvas screenshot
    var btnSave = document.querySelector("#btnSave");
    var imgOut = document.querySelector("#img-out");

    function generateCanvas() {
      btnSave.addEventListener("click", function () {
        html2canvas(document.querySelector("#result")).then(canvas => {
          document.body.appendChild(canvas);
          var b = $("canvas").appendTo("#img-out");
          // var b = document.querySelectorAll("#mew");
          for (var i = 0; i < b.length; i++) {
            console.log(b[i]);
            console.log($(b[i]).first());
            // while (typeof b[i] === "object") {
            //   b[i].removeChild(b[i]);
          }
          //     (canvas => {
          // imgOut.append(canvas);
          // });
          // }
        });
      });
    }
    init();
  }

  //Upload custom picture
  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
      }


    }
  }
}
