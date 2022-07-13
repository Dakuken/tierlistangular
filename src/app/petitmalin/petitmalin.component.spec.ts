import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitmalinComponent } from './petitmalin.component';

describe('PetitmalinComponent', () => {
  let component: PetitmalinComponent;
  let fixture: ComponentFixture<PetitmalinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetitmalinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitmalinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
