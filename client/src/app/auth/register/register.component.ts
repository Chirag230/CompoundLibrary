import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';


  
  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error = err.error.error || 'Registration failed';
      }
    });
  }
}
