import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // isLoginPage = false;

  // constructor(private router: Router) {}
  // ngOnInit() {
  //   // Subscribe to router events and check for NavigationEnd
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     // Check if the current route contains '/login' (or use exact match if needed)
  //     this.isLoginPage = this.router.url.includes('/login');
  //   });
  // }

}
