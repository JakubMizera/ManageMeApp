import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityViewComponent } from './functionality-view.component';

describe('FunctionalityViewComponent', () => {
  let component: FunctionalityViewComponent;
  let fixture: ComponentFixture<FunctionalityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalityViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
