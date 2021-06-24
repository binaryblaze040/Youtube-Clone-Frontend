import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Observable, Subscriber } from 'rxjs';
import { configuration } from "src/configuration/config";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error : any;

  document : any;
  fileSize : any;
  byteContent : any;
  maxFileSize : any;
  

  constructor(private svc : DataService, private router : Router) {
    this.maxFileSize = configuration.maxFileSize;
    this.byteContent = configuration.defaultImage;
  }

  ngOnInit(): void {
  }

  signUp(formData : any)
  {
    formData.avatar = this.byteContent;
    this.svc.registerUser(formData).subscribe( () => {
      this.router.navigate(['/login']);
    }, (err) => {
      
      if(err.status == 409)
        this.error = "Email already exists!";

      else
        this.error = "Oops server error!"

    });
  }

  avatarUpload(target : any)
  {
    this.document = target.files[0];
    this.convertToBase64(this.document);
    this.fileSize = this.document.size;
  }

  convertToBase64(file: File) {
    let byteStream = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    byteStream.subscribe((byte : any) => {
      this.byteContent = byte;
      console.log(byte);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

}
