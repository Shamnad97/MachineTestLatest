import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router) {}  // Inject Router

  onSubmit() {
    // Hardcoded credentials check
    if (this.username === 'touchworld' && this.password === 'touchworldTech') {
      this.loginError = false;  // Hide error if credentials are correct
      // Redirect to employee listing page
      this.router.navigate(['/employee-listing']);
    } else {
      this.loginError = true;  // Show error if credentials are incorrect
    }
  }
}
