import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    if (this.name && this.password) {
      const user = { name: this.name };
      this.authService.login(user);
      this.router.navigate(['/']);
    }
  }
}
