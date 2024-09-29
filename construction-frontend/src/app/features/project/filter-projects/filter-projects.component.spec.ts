import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProjectsComponent } from './filter-projects.component';

describe('FilterProjectsComponent', () => {
  let component: FilterProjectsComponent;
  let fixture: ComponentFixture<FilterProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
