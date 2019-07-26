import { Component, OnInit } from '@angular/core';
import { PhongserviceService } from '../../share/services/phongservice.service';
import { DichvuService } from '../../share/services/dichvu.service';
import { Iphong } from '../../share/entities/iphong';
import { LoginService } from '../../share/services/login.service';
import { Iphongstore } from '../../share/entities/iphongstore';
import { Router } from '@angular/router';
import { e } from '@angular/core/src/render3';
const moment = require('moment');
declare var $: any;

@Component({
  selector: 'app-gioithieuphong',
  templateUrl: './gioithieuphong.component.html',
  styleUrls: ['./gioithieuphong.component.scss']
})
export class GioithieuphongComponent implements OnInit {
  private loaip: any[] = [];
  private loaidv: any[] = [];
  private phong: any[] = [];
  private modal: any[] = [];
  private buoidat: any = {};
  private buoi: any[] = [];
  private ngay: any;
  private phongChon: Iphong;
  private tienphong: number;
  private mang: string[] = [];
  private show = false;
  private tinhtrangphongstore: number;
  today = new Date();
  private phongstore: Iphongstore[] = [];
  private fromDate;
  constructor(private phongservice: PhongserviceService, private dvser: DichvuService, private gettime: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.fromDate = moment(new Date()).format('YYYY-MM-DD');
    this.phongservice.laydanhsachloaiphong().subscribe(res => {
      this.loaip = res;
      this.loaip.forEach(element => {
        this.phongservice.laydanhsachphong().subscribe(response => {
          const phong: any[] = [];
          response.forEach(res2 => {
            if (res2.loai === element.ten) {
              phong.push(res2);
            }
          });
          element['dsp'] = phong;
        });
      });
      this.laythoigianhientai();
    }
    );
    this.dvser.laydanhsachDV().subscribe(res => this.loaidv = res);
  }
  modalShow(item) {
    this.modal = item;
  }
  tinhTienPhong() {
    var tong = 0;
    this.phongstore = JSON.parse(localStorage.getItem('phong'));
    if (this.phongstore) {
      this.phongstore.forEach(element => {
        tong = tong + element.item.gia;
      })
      return tong;
    }


  }
  kiemTraPhongVuaDat() {
    this.phongstore = JSON.parse(localStorage.getItem('phong'));
    if (!this.phongstore) {
      this.tinhtrangphongstore = 0;

    }
    else {
      if (this.phongstore.length == 0) {
        this.tinhtrangphongstore = 0;
      }
      else {
        this.tinhtrangphongstore = 1;
      }

    }


  }
  laythoigianhientai() {
    this.gettime.getlistblankroom(moment(new Date()).format('DD-MM-YYYY')).subscribe(res => {
      console.log(this.loaip);
      this.loaip.forEach(element2 => {
        setTimeout(() => {
          element2.dsp.forEach(element3 => {
            this.buoidat = {
              buoisang: true,
              buoichieu: true
            };
            res.forEach(element => {
              if (element3._id === element._idphong._id) {
                if (element.buoiDat === 1) {
                  this.buoidat.buoisang = false;
                }
                if (element.buoiDat === 2) {
                  this.buoidat.buoichieu = false;
                }
              }
            });
            element3['buoidat'] = this.buoidat;
          });
        }, 3000);
      });
      this.show = true;
      // this.ngay = moment(new Date(event.target.value)).format('DD-MM-YYYY');
    });
  }
  nextDate() {
    this.fromDate = moment(this.fromDate, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD');
    this.gettime.getlistblankroom(moment(this.fromDate).format('DD-MM-YYYY')).subscribe(res => {
      this.loaip.forEach(element2 => {
        element2.dsp.forEach(element3 => {
          this.buoidat = {
            buoisang: true,
            buoichieu: true
          };
          res.forEach(element => {
            if (element3._id === element._idphong._id) {
              if (element.buoiDat === 1) {
                this.buoidat.buoisang = false;
              }
              if (element.buoiDat === 2) {
                this.buoidat.buoichieu = false;
              }
            }
          });
          element3['buoidat'] = this.buoidat;
        });

      });
      console.log(this.loaip);
      this.show = true;
    });
  }
  prevDate() {
    if (moment(this.fromDate).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY')) {
      return false;
    }
    this.fromDate = moment(this.fromDate, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD');
    this.gettime.getlistblankroom(moment(this.fromDate).format('DD-MM-YYYY')).subscribe(res => {
      this.loaip.forEach(element2 => {
        element2.dsp.forEach(element3 => {
          this.buoidat = {
            buoisang: true,
            buoichieu: true
          };
          res.forEach(element => {
            if (element3._id === element._idphong._id) {
              if (element.buoiDat === 1) {
                this.buoidat.buoisang = false;
              }
              if (element.buoiDat === 2) {
                this.buoidat.buoichieu = false;
              }
            }
          });
          element3['buoidat'] = this.buoidat;
        });

      });
      console.log(this.loaip);
      this.show = true;
    });
  }
  laythoigian(event) {
    // if (new Date(event.target.value) < this.today) {
    //   return false;
    // }
    this.gettime.getlistblankroom(moment(new Date(event.target.value)).format('DD-MM-YYYY')).subscribe(res => {
      this.loaip.forEach(element2 => {
        console.log(element2);
        element2.dsp.forEach(element3 => {
          this.buoidat = {
            buoisang: true,
            buoichieu: true
          };
          res.forEach(element => {
            if (element3._id === element._idphong._id) {
              if (element.buoiDat === 1) {
                this.buoidat.buoisang = false;
              }
              if (element.buoiDat === 2) {
                this.buoidat.buoichieu = false;
              }
            }
          });
          element3['buoidat'] = this.buoidat;
        });

      });
      console.log(this.loaip);
      this.show = true;
      this.ngay = moment(new Date(event.target.value)).format('DD-MM-YYYY');
    });
  }
  kiemtrabuoi(buoi, id) {
    this.buoi = JSON.parse(localStorage.getItem('buoi'));
    const ngaytemp = JSON.parse(localStorage.getItem('thoidiemden_temp'));
    if (ngaytemp) {
      if (this.fromDate === ngaytemp) {
        for (let i = 0; i < this.buoi.length; i++) {
          if (this.buoi[i].buoiDat === buoi && this.buoi[i]._idphong === id) {
            return true;
          }
        }
      }
    } else {
      if (this.buoi) {
        for (let i = 0; i < this.buoi.length; i++) {
          if (this.buoi[i].buoiDat === buoi && this.buoi[i]._idphong === id) {
            return true;
          }
        }
      }
      return false;
    }

  }
  giatriphong(giatri: Iphong) {
    const phong = JSON.parse(localStorage.getItem('phong'));
    const buoi = JSON.parse(localStorage.getItem('buoi'));
    if (!buoi || buoi.length === 0 || buoi[0]._idphong !== giatri._id) {
      alert('Chọn buổi cho phòng trên');
    } else {
      if (!phong || phong.length === 0) {

        this.phongChon = giatri;
        this.phongservice.themvaophong(giatri);
        if (buoi.length === 2) {
          let pp = JSON.parse(localStorage.getItem('phong'));
          pp[0].item.gia = pp[0].item.gia * 2;
          localStorage.setItem('phong', JSON.stringify(pp));
        }
        this.layPhongStore();
        this.tienphong = this.tinhTienPhong();
        this.kiemTraPhongVuaDat();

      } else {
        alert('Xin lỗi bạn đã chọn phòng rồi');
      }
    }
  }
  layPhongStore() {
    this.phongstore = JSON.parse(localStorage.getItem('phong'));


    if (this.phongstore) {
      this.mang = this.phongstore.map(res => { return res.item._id });
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
    console.log(data);
    if (!localStorage.getItem('buoi')) {
      this.buoi.push(data);
      localStorage.setItem('buoi', JSON.stringify(this.buoi));
    } else if (localStorage.getItem('buoi') === null) {
      this.buoi.push(data);
      localStorage.setItem('buoi', JSON.stringify(this.buoi));
    } else {
      this.buoi = JSON.parse(localStorage.getItem('buoi'));
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
        localStorage.setItem('buoi', JSON.stringify(this.buoi));
      } else if (buoidadat === false && dem === 0) {
        this.buoi.push(data);
        localStorage.setItem('buoi', JSON.stringify(this.buoi));
      } else {
        this.clearbuoi();
        this.buoi = [];
        const phong = [];
        this.buoi.push(data);
        localStorage.setItem('phong', JSON.stringify(phong));
        localStorage.setItem('buoi', JSON.stringify(this.buoi));
      }
    }

  }
  clearbuoi() {
    const clear = [];
    localStorage.setItem('buoi', JSON.stringify(clear));
  }
  clearphong() {
    const clear = [];
    localStorage.setItem('phong', JSON.stringify(clear));
  }
  cleartime() {
    const clear = [];
    localStorage.setItem('thoidiemden', JSON.stringify(clear));
  }
  storedate(item_p) {
    const date = this.fromDate;
    const tempDate = JSON.parse(localStorage.getItem('thoidiemden'));
    const tempBuoi = JSON.parse(localStorage.getItem('buoi'));
    const tempphong = JSON.parse(localStorage.getItem('phong'));
    if (!tempBuoi || tempBuoi.length === 0) {
      alert('vui long chọn buổi đến');
    } else if (tempBuoi[0]._idphong !== item_p._id) {
      alert('vui long chọn buổi đến cho phòng trên');
    } else if (tempphong && tempphong.length !== 0) {
      if (tempphong[0].item._id === item_p._id) {
        alert('Phòng đã đặt, bạn hãy chọn món');
      }
    } else {
      localStorage.setItem('thoidiemden', JSON.stringify(moment(date).format('DD-MM-YYYY')));
      localStorage.setItem('thoidiemden_temp', JSON.stringify(this.fromDate));
      if (tempBuoi.length === 2) {
        item_p['giathat'] = item_p.gia;
        item_p.gia = item_p.gia * 2;
      }
      const data = [{
        item: item_p,
        sl: 1
      }];
      localStorage.setItem('phong', JSON.stringify(data));
      localStorage.setItem('phong_temp', JSON.stringify(data));
      if (confirm('Đặt thành công! Mời bạn chọn món')) {
        this.router.navigate(['/home/dish']);
      }
    }
  }
  xacnhan(item) {
    this.giatriphong(item);
    localStorage.setItem('thoidiemden', JSON.stringify(this.ngay));
    this.router.navigate(['/home/listcart/cart']);
  }
}
