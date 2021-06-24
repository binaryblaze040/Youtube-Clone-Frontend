import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  channelVideos: any;

  currentVideo : any;

  videoEdit : any;

  searchResults : any;

  constructor(private http : HttpClient, private router : Router) { }

  setActiveUser(userEmail : any, userName : any, avatar: any)
  {
    localStorage.setItem("username", userName);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("avatar", avatar);
  }

  logout()
  {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    this.channelVideos = [];
    this.router.navigate(['/']);
  }

  isLoggedIn()
  {
    if(localStorage.getItem("email"))
      return true;
    else
      return false;
  }

  channel()
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/channel";
    this.http.post(api, {email : localStorage.getItem("email")}).subscribe( (data) => {
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
    formData.user = localStorage.getItem("email");
    formData.channel = localStorage.getItem("username");
    formData.avatar = localStorage.getItem("avatar");

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
    video.user = localStorage.getItem("email");

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

  async search(query : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/search";
    this.http.post(api, {query : query}).subscribe( async (videos) => {
      await this.router.navigate(['/loading']);
      this.searchResults = videos;
      this.router.navigate(['/search']);
    }, () => {
      alert("Please enter a valid keyword to search!")
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
      alert("Comment Added! (Your comment will be visible next time when you open this video)");
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
      alert("Comment Deleted! (Comment will be removed next time when you this video)");
    });
  }

  views(data : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/views";
    return this.http.post(api, data).subscribe( async () => {
      this.router.navigate(['/video']);
    });
  }

  resetPassword(data : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/resetpassword";
    return this.http.post(api, data).subscribe( () => {

      alert("Reset mail sent to your e-mail id");

    }, () => {
      
      alert("Sorry, something went wrong, either the mail id is not valid or maybe there is some internal error");
    });
  }

  resetPasswordRequest(data : any)
  {
    let api = "https://binaryblaze-youtube-clone.herokuapp.com/resetpasswordrequest";
    return this.http.post(api, data).subscribe( async () => {
      await this.router.navigate(['/login']);
      alert("Password changed sucessfully!");
    }, () => {
      alert("Sorry, something went wrong, please try again later");
    });

  }

}
