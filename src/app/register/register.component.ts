import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private svc : DataService, private router : Router) { }

  error : any;

  ngOnInit(): void {
  }

  signUp(formData : any)
  {
    
    this.svc.registerUser(formData).subscribe( (status:any) => {
      this.router.navigate(['/loading']);
      this.router.navigate(['/login']);
    }, (err) => {
      
      if(err.status == 409)
        this.error = "Email already exists!";

      else
        this.error = "Oops server error!"

    });
  }

}
