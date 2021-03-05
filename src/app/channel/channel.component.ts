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
  
  constructor(private svc : DataService, private router : Router) {
    this.videos = this.svc.channelVideos;
    this.username = this.svc.activeUserName;
    this.userEmail = this.svc.activeUserEmail;

    let viewCount = 0;
    for(let i=0; i<this.videos.length; i++)
      viewCount += this.videos[i].views;

    this.views = viewCount;
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

  deleteVideo(video : any)
  {
    this.router.navigate(['/loading']);
    this.svc.deleteVideo(video);
  }

}
