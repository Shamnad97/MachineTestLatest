import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    
    // sessionStorage.clear(); 
    // localStorage.clear(); 

    // Redirect to the login page
    this.router.navigate(['/']);
  }
}
