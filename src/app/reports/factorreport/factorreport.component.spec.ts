import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorreportComponent } from './factorreport.component';

describe('FactorreportComponent', () => {
  let component: FactorreportComponent;
  let fixture: ComponentFixture<FactorreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
