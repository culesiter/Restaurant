import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-end',
  templateUrl: './payment-end.component.html',
  styleUrls: ['./payment-end.component.scss']
})
export class PaymentEndComponent implements OnInit {

  private vpc_TxnResponseCode;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.vpc_TxnResponseCode = params['vpc_TxnResponseCode'];
      console.log(this.vpc_TxnResponseCode);
    });
  }

}
