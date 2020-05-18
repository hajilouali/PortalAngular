import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorInfoComponent } from './factor-info.component';

describe('FactorInfoComponent', () => {
  let component: FactorInfoComponent;
  let fixture: ComponentFixture<FactorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
