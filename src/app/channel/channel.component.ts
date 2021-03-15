import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  
  videos;
  username;
  userEmail;
  views;
  currentVideoDelete : any;
  
  constructor(private svc : DataService, private router : Router) {
    this.videos = this.svc.channelVideos;
    this.username = localStorage.getItem("userName");
    this.userEmail = localStorage.getItem("email");

    let viewCount = 0;
    for(let i=0; i<this.videos.length; i++)
      viewCount += this.videos[i].views;

    this.views = viewCount;

    if(this.videos.length > 0)
      this.currentVideoDelete = this.videos[0];
  }

  ngOnInit(): void {
  }

  getVideo(video:any)
  {
    this.svc.showVideo(video);
  }

  editVideo(video : any)
  {
    this.router.navigate(['/loading']);
    this.svc.editComponent(video);
  }

  setcurrentVideoDelete(video : any)
  {
    this.currentVideoDelete = video;
  }

  deleteVideo(video : any)
  {
    this.router.navigate(['/loading']);
    this.svc.deleteVideo(video);
  }

}
