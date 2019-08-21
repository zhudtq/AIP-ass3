import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicRankingComponent } from './topic-ranking.component';

describe('TopicRankingComponent', () => {
  let component: TopicRankingComponent;
  let fixture: ComponentFixture<TopicRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
