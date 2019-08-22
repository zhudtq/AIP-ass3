import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicRankingComponent } from './pic-ranking.component';

describe('PicRankingComponent', () => {
  let component: PicRankingComponent;
  let fixture: ComponentFixture<PicRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
