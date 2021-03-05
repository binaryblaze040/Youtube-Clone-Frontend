import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

  video : any;

  constructor(private svc : DataService, private router : Router) {
    this.video = svc.videoEdit;
  }

  ngOnInit(): void {
  }

  editVideo(formData : any)
  {
    this.router.navigate(['/loading']);
    this.svc.editVideo(formData);
  }

}
