import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {
    console.log('LoginComponent constructor called');
  }

  onSubmit() {
    const loginData = { email: this.email, password: this.password };
    console.log('Login submitted:', loginData);

    this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe(
        response => {
          console.log('HTTP GET successful:', response);
        },
        error => {
          console.error('HTTP GET failed:', error);
        }
      );
  }
}
