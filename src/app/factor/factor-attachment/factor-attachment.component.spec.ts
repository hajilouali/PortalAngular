import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorAttachmentComponent } from './factor-attachment.component';

describe('FactorAttachmentComponent', () => {
  let component: FactorAttachmentComponent;
  let fixture: ComponentFixture<FactorAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
