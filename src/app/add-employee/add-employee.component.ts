import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-employee',
  standalone: false,
  
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  employee = {
    name: '',
    contact: '',
    email: '',
    address: ''
  };
  showAlert: boolean = false;
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees.push(this.employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    
    Swal.fire({
      title: 'Success!',
      text: 'Employee added successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#4caf50', 
    });

    this.router.navigate(['/employee-listing']);
  }

}
