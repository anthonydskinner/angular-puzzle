import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  periodFromDate: Date;
  periodToDate: Date;
  stockPickerFormSubsr: Subscription;
  maxFromDate: Date;
  maxToDate: Date;
  minToDate: Date;

  todaysDate = new Date();
  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required],
      periodFromDate: [null],
      periodToDate: [null]
    });
  }

  ngOnInit() {
    this.maxFromDate = this.todaysDate;
    this.maxToDate = this.todaysDate;

    this.stockPickerFormSubsr = this.stockPickerForm.valueChanges.subscribe(
      () => {
        this.getQuote();
      }
    );
  }

  ngOnDestroy() {
    this.stockPickerFormSubsr.unsubscribe();
  }

  getQuote() {
    const { symbol, period, periodFromDate, periodToDate } = this.stockPickerForm.value;

    this.minToDate = periodFromDate;
    this.maxFromDate = periodToDate;

    if (this.stockPickerForm.valid) {
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
