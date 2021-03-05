import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  activeUserEmail = "";
  activeUserName = "";

  channelVideos: any;

  currentVideo : any;

  videoEdit : any;

  searchResults : any;

  constructor(private http : HttpClient, private router : Router) { }

  setActiveUser(userEmail : any, userName : any)
  {
    this.activeUserEmail = userEmail;
    this.activeUserName = userName;
  }

  logout()
  {
    this.activeUserEmail = "";
    this.activeUserName = "";
    this.channelVideos = [];
  }

  channel()
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/channel";
    this.http.post(api, {email : this.activeUserEmail}).subscribe( (data) => {
      this.channelVideos = data;
      this.router.navigate(['/channel']);
    });
    
  }

  getVideos()
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/videos";
    return this.http.get(api);
  }

  async showVideo(videoDetails : any)
  {
    await this.router.navigate(['/loading']);
    this.currentVideo = videoDetails;
    this.router.navigate(['/video']);
  }

  upload(formData : any)
  { 
    formData.user = this.activeUserEmail;
    console.log(formData);

    let api = "https://binaryblaze-youtube-clone.herokuapp.com/upload";
    this.http.post(api, formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  editComponent(video : any)
  {
    this.videoEdit = video;
    this.router.navigate(['/editVideo']);
  }

  editVideo(video : any)
  {
    video.user = this.activeUserEmail;

    let api = "https://binaryblaze-youtube-clone.herokuapp.com/edit";
    this.http.post(api, video).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  deleteVideo(video : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/delete";
    this.http.post(api, video).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  search(query : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/search";
    this.http.post(api, {query : query}).subscribe( async (videos) => {
      await this.router.navigate(['/loading']);
      this.searchResults = videos;
      this.router.navigate(['/search']);
    });
  }

  getRecommendations(tags : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/recommendations";
    return this.http.post(api, {tags : tags});
  }

  registerUser(formData : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/register";
    return this.http.post(api, formData);
  }

  login(formData : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/login";
    return this.http.post(api, formData);
  }

  comment(data:any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/comment";
    return this.http.post(api, data).subscribe( async (message) => {
      this.router.navigate(['/video']);
      alert("Comment Added!");
    });
  }

  like(data : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/like";
    return this.http.post(api, data).subscribe( async () => {
      this.router.navigate(['/video']);
    });
  }

  dislike(data : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/dislike";
    return this.http.post(api, data).subscribe( async () => {
      this.router.navigate(['/video']);
    });
  }

  deleteComment(data : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/deleteComment";
    return this.http.post(api, data).subscribe( async () => {
      this.router.navigate(['/video']);
      alert("Comment Deleted!");
    });
  }

  views(data : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/views";
    return this.http.post(api, data).subscribe( async () => {
      this.router.navigate(['/video']);
    });
  }

}
