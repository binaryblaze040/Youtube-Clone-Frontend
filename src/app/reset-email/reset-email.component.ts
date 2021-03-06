import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {

  constructor(private svc : DataService) { }

  ngOnInit(): void {
  }

  resetPass(formData:any)
  {
    this.svc.resetPassword({
      email : formData.mail
    });
  }

}
