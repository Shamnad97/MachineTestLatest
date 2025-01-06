import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDatatableComponent } from './api-datatable.component';

describe('ApiDatatableComponent', () => {
  let component: ApiDatatableComponent;
  let fixture: ComponentFixture<ApiDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiDatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
