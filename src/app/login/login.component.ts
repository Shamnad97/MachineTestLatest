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

  constructor(private router: Router) {}  

  onSubmit() {
    if (this.username === 'touchworld' && this.password === 'touchworldTech') {
      this.loginError = false;  
      this.router.navigate(['/employee-listing']);
    } else {
      this.loginError = true; 
    }
  }
  onCreateAccount(event: Event) {
    event.preventDefault(); 
    
  }
  
}
