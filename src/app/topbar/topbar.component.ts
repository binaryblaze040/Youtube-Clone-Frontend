import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private svc : DataService, private router : Router) { }

  ngOnInit(): void {
  }
  
  searchVideo(formData : any)
  {
    this.svc.search(formData.searchQuery);
  }

}
