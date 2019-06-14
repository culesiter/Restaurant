import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HoadonService } from '../../share/services/hoadon.service';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, AfterViewInit {
  private hoadonkh: any;
  private chitiet: any;
  private chitietma: any;
  private phong: any;
  private dichvu: any;
  private doi = false;
  private fade = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private hoadon: HoadonService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      retrieve: true,
      paging: false,
    };

    this.layhoadon();
  }
  delete(id) {
    this.hoadon.huy(id).subscribe(Response => {
      this.layhoadon();
    });
  }
  ngAfterViewInit(): void {
    this.layhoadon();
  }
  layhoadon() {
    const khachhang = JSON.parse(localStorage.getItem('user'));
    this.hoadon.laydanhsachtheokh(khachhang._id).subscribe(Response => {
      this.hoadonkh = Response;
      this.dtTrigger.next();
    });
  }
  toDetail(_id) {
    this.doi = true;
    this.fade = true;
    this.layPhong(_id);
    this.hoadon.laydanhsachtheoid(_id).subscribe(Response => {
      this.chitiet = Response;
    });
    this.hoadon.getCTHDMA(_id).subscribe(Response => {
      Response.forEach(element => {
        if (element._idmonan.khuyenmai > 0) {
          element._idmonan['giacu'] = element._idmonan.gia;
          element._idmonan.gia = element._idmonan.gia * (100 - element._idmonan.khuyenmai) / 100;
        }
      });
      this.chitietma = Response;
    });
    this.hoadon.laydichvutheoid(_id).subscribe(Response => {
      if (Response.length === 0) {
        this.dichvu = false;
        return false;
      }
      this.dichvu = Response;
    });

  }
  layPhong(_id) {
    this.hoadon.laydanhsachtheoid(_id).subscribe(Response => {
      this.hoadon.layphongtheoid(Response[0]._idphong._id).subscribe(res => {
        this.phong = res;
        this.doi = false;
        this.fade = false;
      });
    });
  }
}
