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
  // loadUsers(): void {
  //   const count = 10; // Number of users per page
  //   this.apiService.getUsers(count, this.currentPage).subscribe(response => {
  //     console.log('API Response:', response); // Print the response to the console
  //     this.users = response.data; // Data from the API
  //     this.totalUsers = response.total; // Total number of users
  //     this.totalPages = Math.ceil(this.totalUsers / count); // Calculate total pages
  //   });
  // }
  loadUsers(): void {
    const count = 10; // Number of users per page
    this.apiService.getUsers(count, this.currentPage).subscribe(response => {
      console.log('API Response:', response); // Print the response to the console
  
      // Directly assign the response to 'users' as it is an array
      if (Array.isArray(response)) {
        this.users = response; // Assign the response (which is the array of users) to users
        this.totalUsers = 200000; // You can update this dynamically if the API returns it
        this.totalPages = Math.ceil(this.totalUsers / count); // Calculate total pages
        console.log('Total records:', this.totalUsers);
        console.log('Current page data:', this.users);

        // if (this.currentPage > this.totalPages) {
        //   this.currentPage = this.totalPages;
        // }
      } else {
        console.error('Unexpected response format:', response);
        this.users = []; // Set users to an empty array if the response is not in expected format
      }
  
      // Optionally handle pagination if response has the total number of users
      // this.totalUsers = 200000; // You can update this dynamically if the API returns it
      // this.totalPages = Math.ceil(this.totalUsers / count); // Calculate total pages
  
      // Ensure current page does not exceed total pages
      // if (this.currentPage > this.totalPages) {
      //   this.currentPage = this.totalPages;
      // }
    }, error => {
      console.error('Error loading users:', error);
      this.users = []; // Set users to empty array in case of an error
    });
  }  
  
  // Method to go to a specific page
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Prevent invalid page navigation
    }
    this.currentPage = page;
    this.loadUsers(); // Fetch users for the selected page
  }

  // Method to filter users based on the search query
  // filterUsers(): void {
  //   this.loadUsers();
  // }
  filterUsers(): void {
    // Reset to the first page when applying a filter
    this.currentPage = 1;
    this.loadUsers();
  }

  // Method to sort the users table based on a column
  // sortTable(column: string): void {
  //   this.users.sort((a, b) => {
  //     if (a[column] < b[column]) return -1;
  //     if (a[column] > b[column]) return 1;
  //     return 0;
  //   });
  // }
  sortTable(column: string): void {
    this.sortedColumn = column;
    this.sortDirection = !this.sortDirection;

    // Sort the users array based on the selected column and direction
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
