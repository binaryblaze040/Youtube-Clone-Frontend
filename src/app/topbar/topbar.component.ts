import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  constructor(public topbarsvc : DataService, private router : Router) {
  }

  ngOnInit(): void {

  }
  
  searchVideo(formData : any)
  {
    this.topbarsvc.search(formData.searchQuery);
  }

  logout()
  {
    this.topbarsvc.logout();
  }

  getChannel()
  {
    this.router.navigate(['/loading']);
    this.topbarsvc.channel();
  }

}
