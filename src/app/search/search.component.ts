import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  videos : any;

  constructor(private svc : DataService) {
    this.videos = svc.searchResults;
   }

  ngOnInit(): void {
  }

  getVideo(video:any)
  {
    this.svc.showVideo(video);
  }

}
