import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiketsManagerComponent } from './tikets-manager.component';

describe('TiketsManagerComponent', () => {
  let component: TiketsManagerComponent;
  let fixture: ComponentFixture<TiketsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiketsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiketsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
