import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HoadonService } from '../../share/services/hoadon.service';
import { LoginService } from '../../share/services/login.service';

@Component({
  selector: 'app-payment-end',
  templateUrl: './payment-end.component.html',
  styleUrls: ['./payment-end.component.scss']
})
export class PaymentEndComponent implements OnInit {

  private vpc_TxnResponseCode;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private hoadon: HoadonService, private thanhtoan: LoginService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.vpc_TxnResponseCode = params['vpc_TxnResponseCode'];
      const id = params['vpc_OrderInfo'];
      this.thanhtoan.checkthanhtoan(window.location.search).subscribe(res => {
        if (res.message === 'Approved') {
          this.hoadon.laydanhsachtheoid(id).subscribe(resp => {
            if (resp[0].hinhthucthanhtoan === 3) {
              const data = {
                action: 2,
                hinhthucthanhtoan: 1
              };
              this.hoadon.sua(id, data).subscribe(response => {
                if (response.message === 'thanh cong') {
                  this.clearalllocal();
                }
              });
            } else {
              const data = {
                action: 2
              };
              this.hoadon.sua(id, data).subscribe(response => {
                if (response.message === 'thanh cong') {
                  this.clearalllocal();
                }
              });
            }
          });
        }
      });
    });
  }
  back() {
    this.router.navigate(['/home/order-detail']);
  }
  clearalllocal() {
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('cart1', JSON.stringify([]));
    localStorage.setItem('dichvu', JSON.stringify([]));
    localStorage.setItem('thoidiemden', JSON.stringify([]));
    localStorage.setItem('phong', JSON.stringify([]));
    localStorage.setItem('buoi', JSON.stringify([]));
    localStorage.setItem('thoidiemden_temp', JSON.stringify([]));
    localStorage.setItem('phong_temp', JSON.stringify([]));
  }
}
