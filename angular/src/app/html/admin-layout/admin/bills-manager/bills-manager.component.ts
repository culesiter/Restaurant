import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ihoadon } from '../../../../share/entities/ihoadon';
import { HoadonService } from '../../../../share/services/hoadon.service';
<<<<<<< HEAD
import { PhongserviceService } from '../../../../share/services/phongservice.service';
// import { ExcelService } from '../../../../share/services/contacService/Excel.service';
=======
import { ExcelService } from '../../../../share/services/contacService/Excel.service';
>>>>>>> 56d1b38ff1d1acab2f58bc46448b9d241b8f8cc9
const moment = require('moment');
@Component({
  selector: 'app-bills-manager',
  templateUrl: './bills-manager.component.html',
  styleUrls: ['./bills-manager.component.scss']
})
export class BillsManagerComponent implements OnInit {
  private xem = true;
  private lstHoadon: Ihoadon[] = [];
  ehoadon: Ihoadon = {};
  private chuaxacnhan: any = [];
  private daxacnhan: any = [];
  private dathanhtoan: any = [];
  private huy: any = [];
  private eCthd: any[] = [];
  private pongdt;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private hoadonS: HoadonService, private phongsv: PhongserviceService, private excelService: ExcelService) { }
  ngOnInit() {
    this.laydsHoadon();
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.lstHoadon, 'sample');
  }
  laydsHoadon() {
    this.hoadonS.laydanhsach().subscribe(res => {
      this.lstHoadon = res;
      this.chuaxacnhan = [];
      this.daxacnhan = [];
      this.dathanhtoan = [];
      this.huy = [];
      res.forEach(element => {
        element.thoidiemtao = moment(element.thoidiemtao).format(' h:mm:ss a, Ngày: DD-MM-YYYY');
        if (element.tinhtrang === 0) {
          this.chuaxacnhan.push(element);
        } else if (element.tinhtrang === 1) {
          this.daxacnhan.push(element);
        } else if (element.tinhtrang === 2) {
          this.dathanhtoan.push(element);
        } else if (element.tinhtrang === -1) {
          this.huy.push(element);
        }
      });
    });
  }
  openDetail(data) {
    this.xem = !this.xem;
    this.ehoadon = data;
<<<<<<< HEAD
    if (data.buoiDat === 1 || data.buoiDat === 2) {
      this.layloaiphong(data._idphong._id, 1);
    } else {
      this.layloaiphong(data._idphong._id, 2);
    }
=======
>>>>>>> 56d1b38ff1d1acab2f58bc46448b9d241b8f8cc9
    this.laycthd(data._id);
  }
  layloaiphong(id, number) {
    this.phongsv.layloaiphong(id).subscribe(res => {
      this.pongdt = res[0];
      this.pongdt.gia = this.pongdt.gia * number;
    });
  }
  laycthd(id) {
    this.hoadonS.getCTHD(id).subscribe(res => {
      if (res) {
        this.eCthd = res;
      }
    });
  }
  confirm(id, action) {
    action = {
      action: action
    };
    this.hoadonS.suahoadon(id, action).subscribe(res => {
      if (res) {
      }
    });
  }
  deleteBill(id) {
    const check = confirm('Bạn có chắc chắn muốn xóa?');
    if (check === true) {
      this.hoadonS.xoa(id).subscribe(res => {
        alert(res.message);
        this.laydsHoadon();
        this.xem = true;
      });
    }
  }
}
