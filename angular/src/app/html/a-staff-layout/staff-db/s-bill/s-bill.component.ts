import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ihoadon } from '../../../../share/entities/ihoadon';
import { HoadonService } from '../../../../share/services/hoadon.service';
import { PhongserviceService } from '../../../../share/services/phongservice.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
declare var $: any;
const moment = require('moment');
@Component({
  selector: 'app-s-bill',
  templateUrl: './s-bill.component.html',
  styleUrls: ['./s-bill.component.scss']
})
export class SBillComponent implements OnInit {
  private xem = true;
  private lstHoadon: Ihoadon[] = [];
  ehoadon: Ihoadon = {};
  private chuaxacnhan: any = [];
  private daxacnhan: any = [];
  private dathanhtoan: any = [];
  private dathanhtoan1: any = [];
  private dathanhtoan2: any = [];
  private huy: any = [];
  private eCthd: any[] = [];
  private pongdt;
  private ectdv: any[] = [];
  private totalma;
  private totaldv;
  private min;
  private max;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // tslint:disable-next-line:max-line-length
  private myDate = new Date();
  constructor(private router: Router, private hoadonS: HoadonService, private phongsv: PhongserviceService,
    private datePipe: DatePipe) {
  }
  ngOnInit() {
    console.log(this.myDate);
    this.laydsHoadon(false, false);
    this.dtOptions = {
      pagingType: 'full_numbers',
      retrieve: true,
      paging: true,
      ordering: false,
      language: {
        processing: 'Procesando...',
        search: 'Tìm Kiếm:',
        lengthMenu: 'Hiển thị _MENU_ mục',
        info: 'Hiển thị từ _START_ đến _END_ mục trong _TOTAL_ mục',
        infoEmpty: 'Không có mục nào',
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "Không có mục nào",
        emptyTable: 'Không có mục nào',
        paginate: {
          first: 'Đầu tiên',
          previous: 'Trở về',
          next: 'Kế tiếp',
          last: 'Cuối cùng'
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
  }
  // exportAsXLSX(): void {
  //   this.excelService.exportAsExcelFile(this.lstHoadon, 'sample');
  // }
  filterById() {
    this.laydsHoadon(this.min, this.max);
  }
  filterById2() {
    this.laydsHoadon(this.min, false);
  }
  filterById3() {
    this.laydsHoadon(false, this.max);
  }
  filterById4() {
    this.laydsHoadon(false, false);
  }
  laydsHoadon(min, max) {
    this.hoadonS.laydanhsach().subscribe(res => {
      this.lstHoadon = res;
      if (min && max) {

      }
      this.chuaxacnhan = [];
      this.daxacnhan = [];
      this.dathanhtoan = [];
      this.dathanhtoan1 = [];
      this.dathanhtoan2 = [];
      this.huy = [];
      res.forEach(element => {
        element.thoidiemtao = moment(element.thoidiemtao).format(' h:mm:ss a, Ngày: DD-MM-YYYY');
        if (!min && !max) {
          if (element.tinhtrang === 0) {
            this.chuaxacnhan.push(element);
          } else if (element.tinhtrang === 1) {
            this.daxacnhan.push(element);
          } else if (element.tinhtrang === 2) {
            this.dathanhtoan.push(element);
            if (element.hinhthucthanhtoan == 2) {
              this.dathanhtoan2.push(element);
            } else {
              this.dathanhtoan1.push(element);
            }
          } else if (element.tinhtrang === -1) {
            this.huy.push(element);
          }
        } else if (min && max) {
          // tslint:disable-next-line:max-line-length
          if (moment(element.thoidiemden, 'DD-MM-YYYY').isAfter(moment(min)) && moment(max).isAfter(moment(element.thoidiemden, 'DD-MM-YYYY'))) {
            console.log(element.thoidiemden);
            if (element.tinhtrang === 0) {
              this.chuaxacnhan.push(element);
            } else if (element.tinhtrang === 1) {
              this.daxacnhan.push(element);
            } else if (element.tinhtrang === 2) {
              this.dathanhtoan.push(element);
              if (element.hinhthucthanhtoan == 2) {
                this.dathanhtoan2.push(element);
              } else {
                this.dathanhtoan1.push(element);
              }
            } else if (element.tinhtrang === -1) {
              this.huy.push(element);
            }
          }
        } else if (min && !max) {
          // tslint:disable-next-line:max-line-length
          if (moment(element.thoidiemden, 'DD-MM-YYYY').isAfter(moment(min))) {
            console.log(element.thoidiemden);
            if (element.tinhtrang === 0) {
              this.chuaxacnhan.push(element);
            } else if (element.tinhtrang === 1) {
              this.daxacnhan.push(element);
            } else if (element.tinhtrang === 2) {
              this.dathanhtoan.push(element);
              if (element.hinhthucthanhtoan == 2) {
                this.dathanhtoan2.push(element);
              } else {
                this.dathanhtoan1.push(element);
              }
            } else if (element.tinhtrang === -1) {
              this.huy.push(element);
            }
          }
        } else if (!min && max) {
          // tslint:disable-next-line:max-line-length
          if (moment(max).isAfter(moment(element.thoidiemden, 'DD-MM-YYYY'))) {
            console.log(element.thoidiemden);
            if (element.tinhtrang === 0) {
              this.chuaxacnhan.push(element);
            } else if (element.tinhtrang === 1) {
              this.daxacnhan.push(element);
            } else if (element.tinhtrang === 2) {
              this.dathanhtoan.push(element);
              if (element.hinhthucthanhtoan == 2) {
                this.dathanhtoan2.push(element);
              } else {
                this.dathanhtoan1.push(element);
              }
            } else if (element.tinhtrang === -1) {
              this.huy.push(element);
            }
          }
        }
      });
      this.dtTrigger.next();
      $.notify('Hiển thị dữ liệu!', 'success');
      $('.modal').modal('hide');
    });
  }
  openDetail(data) {
    this.xem = !this.xem;
    this.ehoadon = data;
    if (data.buoiDat === 1 || data.buoiDat === 2) {
      this.layloaiphong(data._idphong._id, 1);
    } else {
      this.layloaiphong(data._idphong._id, 2);
    }
    this.laycthd(data._id);
    this.laydichvutheohoadon(data._id);
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
      let tong = 0;
      this.eCthd.forEach(element => {
        if (element._idmonan) {
          // tslint:disable-next-line:max-line-length
          tong = tong + (element._idmonan.gia * element.soluongmonan - (element._idmonan.gia * element.soluongmonan * element._idmonan.khuyenmai / 100));
        }
        if (element._idthucdon) {
          // tslint:disable-next-line:max-line-length
          tong = tong + (element._idthucdon.gia * element.soluongthucdon);
        }
      });
      this.totalma = tong;
      console.log(tong);
    });
  }
  laydichvutheohoadon(id) {
    this.hoadonS.laydichvutheoid(id).subscribe(res => {
      console.log(res);
      this.ectdv = res;
      let tong = 0;
      this.ectdv.forEach(element => {
        tong = tong + element._iddichvu.gia;
      });
      this.totaldv = tong;
    });
  }
  confirm(id, action) {
    action = {
      action: action
    };
    this.hoadonS.suahoadon(id, action).subscribe(res => {
      if (res.message === 'thanh cong') {
        $.notify('Xác nhận thành công', 'success');
        this.laydsHoadon(false, false);
      }
    });
  }
  deleteBill(id) {
    const check = confirm('Bạn có chắc chắn muốn xóa?');
    if (check === true) {
      this.hoadonS.xoa(id).subscribe(res => {
        $.notify('Đã xóa một mục!', 'success');
        this.laydsHoadon(false, false);
        this.xem = true;
      });
    }
  }
}
