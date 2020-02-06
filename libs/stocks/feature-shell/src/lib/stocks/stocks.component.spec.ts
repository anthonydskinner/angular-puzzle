import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StocksComponent } from './stocks.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  const fromDate = new Date('2020-01-27T00:00:00.135Z');
  const toDate = new Date('2020-01-29T23:59:59.135Z');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        SharedUiChartModule,
        StoreModule.forRoot({})
      ],
      declarations: [StocksComponent],
      providers: [
        { provide: PriceQueryFacade, useValue: jest.fn() },
        MatDatepickerModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make todays date the max date', () => {
    expect(component.maxDate).toBe(component.todaysDate);
  });

  it('should update FROM date to TO date if TO date is less than FROM date', () => {
    const symbolInput = component.stockPickerForm.controls['symbol'];
    const fromInput = component.stockPickerForm.controls['periodFromDate'];
    const toInput = component.stockPickerForm.controls['periodToDate'];

    symbolInput.setValue('AAPL');
    fromInput.setValue(toDate);
    toInput.setValue(fromDate);

    fixture.detectChanges();

    expect(symbolInput.value).toBe('AAPL');
    expect(fromInput.value).toBe(toInput.value);
    expect(toInput.value).toBe(toInput.value);
  });
});
