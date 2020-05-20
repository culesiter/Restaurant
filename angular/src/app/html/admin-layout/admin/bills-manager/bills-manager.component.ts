import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Ihoadon } from '../../../../share/entities/ihoadon';
import { HoadonService } from '../../../../share/services/hoadon.service';
import { PhongserviceService } from '../../../../share/services/phongservice.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { LoginService } from '../../../../share/services/login.service';
declare var $: any;
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
  private phong;
  private buoi;
  private check = true;
  private crid;
  private crt;
  private gio;
  private phut;
  private today = new Date();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // tslint:disable-next-line:max-line-length
  private myDate = new Date();

  constructor(private router: Router,
    private hoadonS: HoadonService,
    private phongsv: PhongserviceService,
    private datePipe: DatePipe,
    private gettime: LoginService) {
  }
  ngOnInit() {
    console.log(this.myDate);

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
    this.laydsHoadon(false, false);
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
      this.chuaxacnhan = [];
      this.daxacnhan = [];
      this.dathanhtoan = [];
      this.dathanhtoan1 = [];
      this.dathanhtoan2 = [];
      this.huy = [];
      res.forEach(element => {
        const tempdate = element.thoidiemtao;
        element.thoidiemtao = moment(element.thoidiemtao).format(' h:mm:ss a, Ngày: DD-MM-YYYY');
        if (!min && !max) {
          if (element.tinhtrang === 0) {
            this.chuaxacnhan.push(element);
          } else if (element.tinhtrang === 1) {
            const date = moment(tempdate).add(1, 'days');
            // tslint:disable-next-line:max-line-length
            if (moment().isAfter(date)) {
              this.huyhd(element._id, -1);
            } else {
              this.daxacnhan.push(element);
            }
          } else if (element.tinhtrang === 2) {
            const date = moment(tempdate).add(1, 'days');
            console.log(moment(tempdate), date, moment().isAfter(date));
            if (moment().isAfter(date)) {
            } else {
              this.dathanhtoan.push(element);
              if (element.hinhthucthanhtoan == 2 || element.hinhthucthanhtoan == 3) {
                this.dathanhtoan2.push(element);
              } else if (element.hinhthucthanhtoan == 1) {
                this.dathanhtoan1.push(element);
              }
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
              if (element.hinhthucthanhtoan == 2) {
                console.log(1);
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
  huyhd(id, action) {
    action = {
      action: action
    };
    this.hoadonS.suahoadon(id, action).subscribe(res => {
      if (res.message === 'thanh cong') {
        $.notify('Hủy Hóa đơn quá hạn', 'success');
      }
    });
  }
  huyhd2(id, action) {
    action = {
      action: action
    };
    this.hoadonS.suahoadon(id, action).subscribe(res => {
      if (res.message === 'thanh cong') {
        setTimeout(() => {
          $('#detail_modal').modal('hide');
        }, 150);
        this.laydsHoadon(false, false);
        $.notify('Hủy Hóa đơn', 'success');
      }
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
  deletebill2(id) {
    this.hoadonS.xoa(id).subscribe(res => {
      console.log(res);
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
  kiemtrabuoi(buoi, id) {
    this.buoi = JSON.parse(sessionStorage.getItem('buoiad'));
    if (this.buoi) {
      for (let i = 0; i < this.buoi.length; i++) {
        if (this.buoi[i].buoiDat === buoi && this.buoi[i]._idphong === id) {
          return true;
        }
      }
    }
    return false;
  }
  kiemTra(id) {
    const pp = JSON.parse(sessionStorage.getItem('phongad'));
    if (pp) {
      if (id === pp._id) {
        return true;
      }
    }
    return false;
  }
  clearbuoi() {
    const clear = [];
    sessionStorage.setItem('buoiad', JSON.stringify(clear));
  }
  giatriphong(giatri) {
    sessionStorage.setItem('phongad', JSON.stringify(giatri));
    const buoi = JSON.parse(sessionStorage.getItem('buoiad'));
    const phongChon = giatri;

    if (buoi.length === 2) {
      const pp = JSON.parse(sessionStorage.getItem('phongad'));
      pp.gia = pp.gia * 2;
      sessionStorage.setItem('phongad', JSON.stringify(pp));

    }
  }
  getid(id) {
    this.crid = id;
    sessionStorage.setItem('buoiad', JSON.stringify([]));
    sessionStorage.setItem('phongad', JSON.stringify({}));
    $('#thoidiemdat').val('');
    this.phong = false;
    this.gio = false;
    this.phut = false;
  }
  change() {
    if (this.crid) {
      const phong = JSON.parse(sessionStorage.getItem('phongad'));
      const buoi = JSON.parse(sessionStorage.getItem('buoiad'));
      let b;
      let idp;
      let date;
      if (phong && buoi && buoi.length !== 0 && phong !== {}) {
        if (buoi.length === 2) {
          b = 3;
        } else {
          b = buoi[0].buoiDat;
        }
        idp = phong._id;
        date = this.crt;
      }



      let t;
      if (this.gio) {
        t = this.gio + ' gio ' + this.phut + ' phut';
      }
      const action = {
        thoidiemden: date,
        buoiDat: b,
        _idphong: idp,
        gioden: t
      };
      console.log(action);

      this.hoadonS.suahoadon(this.crid, action).subscribe(res => {
        if (res.message === 'thanh cong') {
          $.notify('sửa thành công', 'success');
          this.laydsHoadon(false, false);
          setTimeout(() => {
            $('#edit').modal('hide');
            $('#detail_modal').modal('hide');
          }, 150);
        } else {
          $.notify('sửa thành công', 'success');
        }
      });
    }
  }
  chonBuoi(buoi, idphong) {
    let buoidadat = true;
    let dem = 0;
    this.buoi = [];
    const data = {
      buoiDat: buoi,
      _idphong: idphong
    };
    if (sessionStorage.getItem('buoiad') === null) {
      this.buoi.push(data);
      sessionStorage.setItem('buoiad', JSON.stringify(this.buoi));
    } else {
      this.buoi = JSON.parse(sessionStorage.getItem('buoiad'));
      let index = -1;
      for (let i = 0; i < this.buoi.length; i++) {
        if (this.buoi[i]._idphong === data._idphong && this.buoi[i].buoiDat === data.buoiDat) {
          index = i;
          console.log(i);
          dem = 1;
        } else if (this.buoi[i]._idphong === data._idphong && this.buoi[i].buoiDat !== data.buoiDat) {
          buoidadat = false;
        }
      }
      if (index > -1) {
        this.buoi.splice(index, 1);
        sessionStorage.setItem('buoiad', JSON.stringify(this.buoi));
      } else if (buoidadat === false && dem === 0) {
        this.buoi.push(data);
        sessionStorage.setItem('buoiad', JSON.stringify(this.buoi));
      } else {
        this.clearbuoi();
        this.buoi = [];
        this.buoi.push(data);
        sessionStorage.setItem('buoiad', JSON.stringify(this.buoi));
      }
    }

  }
  laythoigian(event) {
    if (new Date(event.target.value) < this.today) {
      this.check = false;
      return false;
    }
    sessionStorage.setItem('buoiad', JSON.stringify([]));
    sessionStorage.setItem('phongad', JSON.stringify({}));
    this.gettime.getlistblankroom(moment(new Date(event.target.value)).format('DD-MM-YYYY')).subscribe(res => {
      this.phongsv.laydanhsachphong().subscribe(response => {
        this.phong = response;
        this.phong.forEach(element => {
          element['sang'] = 'trong';
          element['chieu'] = 'trong';
          if (res) {
            res.forEach(element2 => {
              if (element._id === element2._idphong._id) {
                if (element2.buoiDat === 1) {
                  element['sang'] = 'dat';
                } else if (element2.buoiDat === 2) {
                  element['chieu'] = 'dat';
                } else {
                  element['sang'] = 'dat';
                  element['chieu'] = 'dat';
                }
              }
            });
          }
        });
        // this.doi = false;
        // this.mochonphong = true;
      });
    });
    this.crt = moment(new Date(event.target.value)).format('DD-MM-YYYY');
  }
}
