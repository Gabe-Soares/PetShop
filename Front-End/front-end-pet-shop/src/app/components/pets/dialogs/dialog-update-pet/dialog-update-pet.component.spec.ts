import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdatePetComponent } from './dialog-update-pet.component';

describe('DialogUpdatePetComponent', () => {
  let component: DialogUpdatePetComponent;
  let fixture: ComponentFixture<DialogUpdatePetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdatePetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdatePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
