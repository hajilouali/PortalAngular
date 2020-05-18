import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorReportByCodeComponent } from './factor-report-by-code.component';

describe('FactorReportByCodeComponent', () => {
  let component: FactorReportByCodeComponent;
  let fixture: ComponentFixture<FactorReportByCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorReportByCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorReportByCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
