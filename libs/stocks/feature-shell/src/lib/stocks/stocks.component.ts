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
  periodFromDate: Date;
  periodToDate: Date;
  maxDate: Date;
  stockPickerFormSubsr: Subscription;
  stockPickerFromDateSubsr: Subscription;
  stockPickerToDateSubsr: Subscription;

  todaysDate = new Date();

  quotes$ = this.priceQuery.priceQueries$;

  dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  };

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: ['', { validators: [Validators.required], updateOn: 'blur' }],
      periodFromDate: [
        '',
        { validators: [Validators.required], updateOn: 'blur' }
      ],
      periodToDate: [
        '',
        { validators: [Validators.required], updateOn: 'blur' }
      ]
    });
  }

  ngOnInit() {
    this.maxDate = this.todaysDate;

    this.stockPickerFormSubsr = this.stockPickerForm.valueChanges.subscribe(
      () => {
        this.getQuote();
      }
    );

    this.stockPickerFromDateSubsr = this.stockPickerForm
      .get('periodFromDate')
      .valueChanges.subscribe(periodFromDate => {
        const periodToDate = this.stockPickerForm.get('periodToDate').value;

        if (periodToDate && periodFromDate > periodToDate) {
          this.stockPickerForm.patchValue({
            periodToDate: periodFromDate
          });
        }
      });

    this.stockPickerToDateSubsr = this.stockPickerForm
      .get('periodToDate')
      .valueChanges.subscribe(periodToDate => {
        const periodFromDate = this.stockPickerForm.get('periodFromDate').value;

        if (periodFromDate && periodToDate < periodFromDate) {
          this.stockPickerForm.patchValue({
            periodFromDate: periodToDate
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.stockPickerFormSubsr) {
      this.stockPickerFormSubsr.unsubscribe();
    }

    if (this.stockPickerFromDateSubsr) {
      this.stockPickerFromDateSubsr.unsubscribe();
    }

    if (this.stockPickerToDateSubsr) {
      this.stockPickerToDateSubsr.unsubscribe();
    }
  }

  getQuote() {
    if (this.stockPickerForm.valid) {
      const {
        symbol,
        periodFromDate,
        periodToDate
      } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, periodFromDate, periodToDate);
    }
  }
}
