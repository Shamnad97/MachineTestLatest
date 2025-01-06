import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component'; 
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ApiDatatableComponent } from './api-datatable/api-datatable.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'employee-listing', component: EmployeeListingComponent }, 
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'api-datatable', component: ApiDatatableComponent},
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
