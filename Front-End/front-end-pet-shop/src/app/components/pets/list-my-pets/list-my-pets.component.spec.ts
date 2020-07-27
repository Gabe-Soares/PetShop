import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyPetsComponent } from './list-my-pets.component';

describe('ListMyPetsComponent', () => {
  let component: ListMyPetsComponent;
  let fixture: ComponentFixture<ListMyPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
