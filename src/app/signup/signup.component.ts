import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

    email: string = "";
    password: string = "";
    name: string="";
  
    constructor(private http: HttpClient, private router: Router) {
      console.log('SignupComponent constructor called');
      console.log(`Email: ${this.email}, Password: ${this.password},name: ${this.name}`);
    }
  
    onSubmit() {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('http://127.0.0.1:8000/signup', { email: this.email, password: this.password, name:this.name},{ headers: headers })
        .subscribe(
          (response: any) => {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            this.router.navigate(['/about']);
          },
          error => {
            console.error('signup failed:', error);
            alert('signup failed');
          }
        );
    }
  }

