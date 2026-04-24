import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadHomeSummaryUseCase } from '../application/home/load-home-summary.use-case';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let loadHomeSummary: jasmine.SpyObj<LoadHomeSummaryUseCase>;

  beforeEach(async () => {
    loadHomeSummary = jasmine.createSpyObj<LoadHomeSummaryUseCase>('LoadHomeSummaryUseCase', ['execute']);
    loadHomeSummary.execute.and.resolveTo({
      title: 'Ready when you are',
      message: 'No check-ins yet.',
      latestCheckInDateKey: null,
      checkInCount: 0,
      warningSignCount: 0,
    });

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [{ provide: LoadHomeSummaryUseCase, useValue: loadHomeSummary }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the home summary on init', async () => {
    await fixture.whenStable();

    expect(loadHomeSummary.execute).toHaveBeenCalled();
    expect(component.summary?.title).toBe('Ready when you are');
  });
});
