import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelyingPartyComponent } from './relying-party.component';

describe('RelyingPartyComponent', () => {
  let component: RelyingPartyComponent;
  let fixture: ComponentFixture<RelyingPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelyingPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelyingPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
