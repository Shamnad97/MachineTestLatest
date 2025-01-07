import { Component,OnInit } from '@angular/core';
import { ApiDatatableService } from '../services/api-datatable.service';

@Component({
  selector: 'app-api-datatable',
  standalone: false,
  
  templateUrl: './api-datatable.component.html',
  styleUrl: './api-datatable.component.scss'
})
export class ApiDatatableComponent implements OnInit {

  
  users: any[] = []; // Will hold the user data for the current page
  totalUsers: number = 0; // Total number of users
  currentPage: number = 1; // Current page for pagination
  totalPages: number = 0; // Total number of pages for pagination
  searchQuery: string = ''; // Search query for filtering
  sortedColumn: string = ''; // To track which column is sorted
  sortDirection: boolean = true; 
  
  constructor(private apiService: ApiDatatableService) { }

  ngOnInit(): void {
    this.loadUsers(); // Load the initial set of users
  }

  // Method to load users with pagination
  loadUsers(): void {
    const count = 10; // Number of users per page
    this.apiService.getUsers(count, this.currentPage).subscribe(response => {
      console.log('API Response:', response); 
  
      // Directly assign the response to 'users' as it is an array
      if (Array.isArray(response)) {
        this.users = response; 
        this.totalUsers = 200000; // Update this dynamically if the API returns it
        this.totalPages = Math.ceil(this.totalUsers / count); // Calculate total pages
        console.log('Total records:', this.totalUsers);
        console.log('Current page data:', this.users);

      } else {
        console.error('Unexpected response format:', response);
        this.users = []; 
      }
  
    }, error => {
      console.error('Error loading users:', error);
      this.users = []; 
    });
  }  
  
  // Method to go to a specific page
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; 
    }
    this.currentPage = page;
    this.loadUsers(); 
  }

  getCurrentRange(): string {
    const count = 10; // Number of users per page
    const start = (this.currentPage - 1) * count + 1;
    const end = Math.min(this.currentPage * count, this.totalUsers);
    return `${start}-${end}`;
  }
  
  // Method to filter users based on the search query
  filterUsers(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  // Method to sort the users table based on a column
  sortTable(column: string): void {
    this.sortedColumn = column;
    this.sortDirection = !this.sortDirection;

    this.users.sort((a, b) => {
      if (a[column] < b[column]) return this.sortDirection ? -1 : 1;
      if (a[column] > b[column]) return this.sortDirection ? 1 : -1;
      return 0;
    });
  }


  // Method to calculate which page numbers to show
  pageButtons(): number[] {
    const pagesToShow = 5; // Number of page buttons to show
    let startPage: number, endPage: number;

    // Case 1: If there are fewer pages than we want to show, display all pages
    if (this.totalPages <= pagesToShow) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // Case 2: If the current page is near the beginning, show the first few pages
      if (this.currentPage <= Math.floor(pagesToShow / 2)) {
        startPage = 1;
        endPage = pagesToShow;
      }
      // Case 3: If the current page is near the end, show the last few pages
      else if (this.currentPage + Math.floor(pagesToShow / 2) >= this.totalPages) {
        startPage = this.totalPages - pagesToShow + 1;
        endPage = this.totalPages;
      }
      // Case 4: Show pages around the current page
      else {
        startPage = this.currentPage - Math.floor(pagesToShow / 2);
        endPage = this.currentPage + Math.floor(pagesToShow / 2);
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
