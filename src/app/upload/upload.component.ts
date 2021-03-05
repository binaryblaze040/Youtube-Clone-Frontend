import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  error : any;

  constructor(private svc : DataService) { }

  ngOnInit(): void {
  }

  uploadVideo(formData : any)
  {
    this.svc.upload(formData);
  }

}
