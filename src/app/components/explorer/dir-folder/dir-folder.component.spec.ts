import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirFolderComponent } from './dir-folder.component';

describe('DirFolderComponent', () => {
  let component: DirFolderComponent;
  let fixture: ComponentFixture<DirFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
