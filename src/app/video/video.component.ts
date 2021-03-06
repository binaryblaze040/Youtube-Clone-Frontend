import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  video : any;
  url : any;

  recommendations : any;

  activeUser : any;
  activeUserEmail : any;

  constructor(private svc : DataService, private sanitizer: DomSanitizer) {
    this.video = this.svc.currentVideo;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video.id);

    this.svc.getRecommendations(this.video.tags).subscribe( (data : any) => {
      this.recommendations = data;
    });

    // find if a user is logged in
    this.activeUser = this.svc.activeUserName;

    this.activeUserEmail = this.svc.activeUserEmail;

    // increment views
    this.svc.views({
      url : this.video.link
    });

  }

  ngOnInit(): void {
  }

  getVideo(video:any)
  {
    this.svc.showVideo(video);
  }

  addComment(comment:any)
  {
    this.svc.comment(
      {
        comment : this.activeUser + " : "  + comment.comment,
        url : this.video.link
      }
    );
  }

  like()
  {
    if(this.activeUser == "")
      alert("Login with your account to like a video!");
    else
    {
      this.svc.like(
        {
          url : this.video.link
        }
      );
    }
  }

  dislike()
  {
    if(this.activeUser == "")
      alert("Login with your account to dislike a video!");
    else
    {
      this.svc.dislike(
        {
          url : this.video.link
        }
      );
    }
  }

  deleteComment(comment: any)
  {
    this.svc.deleteComment({
      comment : comment,
      url : this.video.link
    });
  }

}
