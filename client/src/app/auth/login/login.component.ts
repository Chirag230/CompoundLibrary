import { Component } from '@angular/core';
// import { AuthService } from './auth.service';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';
// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/compounds']);
      },
      error: (err) => {
        this.error = err.error.error || 'Login failed';
      }
    });
  }

  goToRegister() {
  this.router.navigate(['/register']);
}
}
