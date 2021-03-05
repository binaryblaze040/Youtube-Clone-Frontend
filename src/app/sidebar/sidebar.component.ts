import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isVisible = false;
  userName = "";
  constructor(private svc : DataService, private router : Router) {
  }

  ngOnInit(): void {
  }

  toogleBar()
  {
    this.isVisible = !this.isVisible;
    this.userName = this.svc.activeUserName;
  }

  logout()
  {
    this.svc.logout();
    this.toogleBar();
  }

  getChannel()
  {
    this.router.navigate(['/loading']);
    this.svc.channel();
    this.toogleBar();
  }

}
