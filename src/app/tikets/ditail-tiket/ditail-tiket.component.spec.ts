import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DitailTiketComponent } from './ditail-tiket.component';

describe('DitailTiketComponent', () => {
  let component: DitailTiketComponent;
  let fixture: ComponentFixture<DitailTiketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DitailTiketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DitailTiketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
