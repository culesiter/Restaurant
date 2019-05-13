import { Component, OnInit } from '@angular/core';
import { HoadonService } from '../../share/services/hoadon.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  private hoadonkh: any;
  private chitiet: any;
  private chitietma: any;
  private phong: any;
  constructor(private hoadon: HoadonService) { }

  ngOnInit() {
    this.layhoadon();
  }
  layhoadon() {
    const khachhang = JSON.parse(localStorage.getItem('user'));
    this.hoadon.laydanhsachtheokh(khachhang._id).subscribe(Response => {
      this.hoadonkh = Response;
    });
  }
  toDetail(_id) {
    this.hoadon.laydanhsachtheoid(_id).subscribe(Response => {
      this.chitiet = Response;
      console.log(this.chitiet)
    });
    this.hoadon.getCTHDMA(_id).subscribe(Response => {
      this.chitietma = Response;
    });
    this.hoadon.laydanhsachtheoid(_id).subscribe(Response => {
      this.hoadon.layphongtheoid(Response[0]._idphong._id).subscribe(res => {
        this.phong = res;
      });
    });

  }

}
