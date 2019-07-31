import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ihoadon } from '../../../../share/entities/ihoadon';
import { HoadonService } from '../../../../share/services/hoadon.service';
import { ExcelService } from '../../../../share/services/contacService/Excel.service';
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
  constructor(private router: Router, private hoadonS: HoadonService, private excelService: ExcelService) { }
  ngOnInit() {
    this.laydsHoadon();
  }
    exportAsXLSX():void {
      this.excelService.exportAsExcelFile(this.lstHoadon, 'sample');
   }
  laydsHoadon() {
    this.hoadonS.laydanhsach().subscribe(res => {
      console.log(res);
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
    this.laycthd(data._id);
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
        console.log(res);
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
