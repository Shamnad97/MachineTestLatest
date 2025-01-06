import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-listing',
  standalone: false,
  
  templateUrl: './employee-listing.component.html',
  styleUrl: './employee-listing.component.scss'
})
export class EmployeeListingComponent implements OnInit {
  
  employees = [
      { name: 'John Doe', contact: '1234567890', email: 'john.doe@example.com', address: '123 Main St' },
      { name: 'Jane Smith', contact: '0987654321', email: 'jane.smith@example.com', address: '456 Oak St' },
      { name: 'Sam Wilson', contact: '1122334455', email: 'sam.wilson@example.com', address: '789 Pine St' },
      { name: 'Ella Stone', contact: '2233445566', email: 'ella.stone@example.com', address: '101 Maple St' },
      { name: 'Chris Lee', contact: '3344556677', email: 'chris.lee@example.com', address: '202 Birch St' },
      { name: 'Max Black', contact: '4455667788', email: 'max.black@example.com', address: '303 Cedar St' },
      { name: 'Sophia Brown', contact: '5566778899', email: 'sophia.brown@example.com', address: '404 Willow St' },
      { name: 'James White', contact: '6677889900', email: 'james.white@example.com', address: '505 Pineapple St' },
      { name: 'Lily Green', contact: '7788990011', email: 'lily.green@example.com', address: '606 Elm St' },
      { name: 'David Black', contact: '8899001122', email: 'david.black@example.com', address: '707 Fir St' },
      { name: 'Mia Clark', contact: '9900112233', email: 'mia.clark@example.com', address: '808 Ash St' },
      { name: 'Benjamin White', contact: '1231231231', email: 'benjamin.white@example.com', address: '909 Pine St' },
      { name: 'Oliver Harris', contact: '2342342342', email: 'oliver.harris@example.com', address: '1000 Maple St' },
      { name: 'Amelia Adams', contact: '3453453453', email: 'amelia.adams@example.com', address: '1100 Oak St' },
      { name: 'Ethan Scott', contact: '4564564564', email: 'ethan.scott@example.com', address: '1200 Birch St' },
      { name: 'Ella Harris', contact: '0120120120', email: 'ella.harris@example.com', address: '1800 Oak St' },
      { name: 'Liam Brown', contact: '1234567892', email: 'liam.brown@example.com', address: '1900 Cedar St' },
      { name: 'Mia Johnson', contact: '2345678903', email: 'mia.johnson@example.com', address: '2000 Pine St' },
      { name: 'Isaac Stone', contact: '3456789014', email: 'isaac.stone@example.com', address: '2100 Birch St' },
      { name: 'Lara Adams', contact: '4567890125', email: 'lara.adams@example.com', address: '2200 Elm St' },
      { name: 'Caleb Green', contact: '5678901236', email: 'caleb.green@example.com', address: '2300 Cedar St' },
      { name: 'Sophia White', contact: '6789012347', email: 'sophia.white@example.com', address: '2400 Pine St' },
      { name: 'Joshua Brown', contact: '7890123458', email: 'joshua.brown@example.com', address: '2500 Oak St' },
      { name: 'Grace Harris', contact: '8901234569', email: 'grace.harris@example.com', address: '2600 Birch St' },
      { name: 'David Green', contact: '9012345670', email: 'david.green@example.com', address: '2700 Elm St' },
      { name: 'Eva Black', contact: '0123456781', email: 'eva.black@example.com', address: '2800 Pine St' },
      { name: 'Michael Harris', contact: '1234567893', email: 'michael.harris@example.com', address: '2900 Cedar St' },
      { name: 'Ava White', contact: '2345678904', email: 'ava.white@example.com', address: '3000 Birch St' },
      { name: 'Ella Johnson', contact: '3456789015', email: 'ella.johnson@example.com', address: '3100 Ash St' },
      { name: 'James Brown', contact: '4567890126', email: 'james.brown@example.com', address: '3200 Pine St' },
      { name: 'Emily Clark', contact: '5678901237', email: 'emily.clark@example.com', address: '3300 Cedar St' },
      { name: 'Oliver Adams', contact: '6789012348', email: 'oliver.adams@example.com', address: '3400 Oak St' },
      { name: 'Madeline Green', contact: '7890123459', email: 'madeline.green@example.com', address: '3500 Birch St' },
      { name: 'George Harris', contact: '8901234560', email: 'george.harris@example.com', address: '3600 Elm St' }
  ]
  searchQuery: string = '';
  currentPage: number = 1;
  employeesPerPage: number = 10; 
  totalPages: number | undefined; 
  paginatedEmployees: any[] = []; 

  constructor(private router: Router,private employeeService: EmployeeService) {}

  ngOnInit() {
    const defaultEmployees = [
      { name: 'John Doe', contact: '1234567890', email: 'john.doe@example.com', address: '123 Main St' },
      { name: 'Jane Smith', contact: '0987654321', email: 'jane.smith@example.com', address: '456 Oak St' },
      { name: 'Sam Wilson', contact: '1122334455', email: 'sam.wilson@example.com', address: '789 Pine St' },
      { name: 'Ella Stone', contact: '2233445566', email: 'ella.stone@example.com', address: '101 Maple St' },
      { name: 'Chris Lee', contact: '3344556677', email: 'chris.lee@example.com', address: '202 Birch St' },
      { name: 'Max Black', contact: '4455667788', email: 'max.black@example.com', address: '303 Cedar St' },
      { name: 'Sophia Brown', contact: '5566778899', email: 'sophia.brown@example.com', address: '404 Willow St' },
      { name: 'James White', contact: '6677889900', email: 'james.white@example.com', address: '505 Pineapple St' },
      { name: 'Lily Green', contact: '7788990011', email: 'lily.green@example.com', address: '606 Elm St' },
      { name: 'David Black', contact: '8899001122', email: 'david.black@example.com', address: '707 Fir St' },
      { name: 'Mia Clark', contact: '9900112233', email: 'mia.clark@example.com', address: '808 Ash St' },
      { name: 'Benjamin White', contact: '1231231231', email: 'benjamin.white@example.com', address: '909 Pine St' },
      { name: 'Oliver Harris', contact: '2342342342', email: 'oliver.harris@example.com', address: '1000 Maple St' },
      { name: 'Amelia Adams', contact: '3453453453', email: 'amelia.adams@example.com', address: '1100 Oak St' },
      { name: 'Ethan Scott', contact: '4564564564', email: 'ethan.scott@example.com', address: '1200 Birch St' },
      { name: 'Ella Harris', contact: '0120120120', email: 'ella.harris@example.com', address: '1800 Oak St' },
      { name: 'Liam Brown', contact: '1234567892', email: 'liam.brown@example.com', address: '1900 Cedar St' },
      { name: 'Mia Johnson', contact: '2345678903', email: 'mia.johnson@example.com', address: '2000 Pine St' },
      { name: 'Isaac Stone', contact: '3456789014', email: 'isaac.stone@example.com', address: '2100 Birch St' },
      { name: 'Lara Adams', contact: '4567890125', email: 'lara.adams@example.com', address: '2200 Elm St' },
      { name: 'Caleb Green', contact: '5678901236', email: 'caleb.green@example.com', address: '2300 Cedar St' },
      { name: 'Sophia White', contact: '6789012347', email: 'sophia.white@example.com', address: '2400 Pine St' },
      { name: 'Joshua Brown', contact: '7890123458', email: 'joshua.brown@example.com', address: '2500 Oak St' },
      { name: 'Grace Harris', contact: '8901234569', email: 'grace.harris@example.com', address: '2600 Birch St' },
      { name: 'David Green', contact: '9012345670', email: 'david.green@example.com', address: '2700 Elm St' },
      { name: 'Eva Black', contact: '0123456781', email: 'eva.black@example.com', address: '2800 Pine St' },
      { name: 'Michael Harris', contact: '1234567893', email: 'michael.harris@example.com', address: '2900 Cedar St' },
      { name: 'Ava White', contact: '2345678904', email: 'ava.white@example.com', address: '3000 Birch St' },
      { name: 'Ella Johnson', contact: '3456789015', email: 'ella.johnson@example.com', address: '3100 Ash St' },
      { name: 'James Brown', contact: '4567890126', email: 'james.brown@example.com', address: '3200 Pine St' },
      { name: 'Emily Clark', contact: '5678901237', email: 'emily.clark@example.com', address: '3300 Cedar St' },
      { name: 'Oliver Adams', contact: '6789012348', email: 'oliver.adams@example.com', address: '3400 Oak St' },
      { name: 'Madeline Green', contact: '7890123459', email: 'madeline.green@example.com', address: '3500 Birch St' },
      { name: 'George Harris', contact: '8901234560', email: 'george.harris@example.com', address: '3600 Elm St' }
    ];
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employees = [...defaultEmployees, ...storedEmployees]; 

    this.totalPages = Math.ceil(this.employees.length / this.employeesPerPage);
    this.paginateEmployees(); 
  }

  paginateEmployees() {
    const start = (this.currentPage - 1) * this.employeesPerPage;
    const end = start + this.employeesPerPage;
    this.paginatedEmployees = this.employees.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateEmployees();
  }
 
  deleteEmployee(index: number) {
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.employees.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(this.employees));
  
        this.totalPages = Math.ceil(this.employees.length / this.employeesPerPage);
        this.paginateEmployees();
  
        Swal.fire({
          title: 'Deleted!',
          text: 'Employee deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4caf50', 
        });
  
        this.router.navigate(['/employee-listing']);
      }
    });
  }
  
  getFilteredEmployees() {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      employee.contact.includes(this.searchQuery) ||
      employee.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      employee.address.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }
}
