import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ApiDatatableComponent } from './api-datatable/api-datatable.component';
import { ApiDatatableService } from './services/api-datatable.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LogoutComponent } from './logout/logout.component';
import { EmployeeService } from './services/employee.service'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListingComponent,
    AddEmployeeComponent,
    AddEmployeeComponent,
    SidebarComponent,
    ApiDatatableComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    ApiDatatableService,
    EmployeeService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
