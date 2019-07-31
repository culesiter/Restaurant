import { Ithucdoninter } from './../../../../share/entities/ithucdoninter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idish } from '../../../../share/entities/idish';
import { DishserviceService } from '../../../../share/services/dishservice.service';
import { ThucdonserviceService } from '../../../../share/services/thucdonservice.service';
import { Ithucdon } from '../../../../share/entities/ithucdon';
import { Ithucdonmonan } from '../../../../share/entities/ithucdonmonan';
import { log } from 'util';
import { CartserviceService } from '../../../../share/services/cartservice.service';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {
  private formStatus = 'view';
  private ss = '';
  private menuTemp: Ithucdon = {};
  private listmon: Idish[] = [];
  private listThucdon: Ithucdon[] = [];
  private lstmontheothucdon: any[] = [];
  private formAddNewMenu: FormGroup;
  private tdmnTemp: Ithucdonmonan = {};
  private countTemp: number = 0;
  private currenttd;
  private tdtotal = 0;
  private styletemp = {};
  private slma = 0;
  constructor(private formBuilder: FormBuilder,
    private dishS: DishserviceService, private menuS: ThucdonserviceService, private cartsv: CartserviceService) { }
  ngOnInit() {
    this.getlistthucdon();
    this.getdsmon();
    this.taoForm();
  }

  back() {
    this.getlistthucdon();
    this.formStatus = 'view';
  }
  taoForm() {
    this.formAddNewMenu = this.formBuilder.group({
      ten: ['', []],
      khuyenmai: ['', []]
    });
  }
  laysl(vl, item) {
    this.countTemp = vl.target.value;

    this.listmon.forEach(element => {
      if (element._id === item._id) {
        element['slma'] = this.countTemp;
      }
    });
    this.cartsv.addTotd(item, this.countTemp);
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    let tong = 0;
    data.forEach(element => {
      tong = tong + this.tinhgiathucdontheomonan(element.sl, element.item.gia, element.item.khuyenmai);
    });
    this.tdtotal = tong - (this.currenttd.values.khuyenmai * tong / 100);

    // this.slma = this.slma - 1;
    // this.tdtotal = this.tdtotal + this.tinhgiathucdontheomonan(this.slma, gia, km);
  }
  formShow(a, id) {
    this.formStatus = a;
    if (a === 'detail') {
      this.menuS.getmonantheoIdthucdon(id).subscribe(res => this.lstmontheothucdon = res);
    }
    sessionStorage.setItem('admintd', JSON.stringify([]));
  }
  getlistthucdon() {
    this.menuS.laydstd().subscribe(res => this.listThucdon = res);
  }
  getdsmon() {
    this.dishS.laydanhsachmonan().subscribe(res => {
      this.listmon = res;
      this.listmon.forEach(element => {
        element['slma'] = 0;
      });
    });
  }
  addNew() {
    // this.menuTemp = this.formAddNewMenu.value;
    this.menuS.taothucdon(this.formAddNewMenu.value).subscribe(res => {
      if (res.message === 'luu thanh cong') {
        this.menuTemp._id = res.values._id;
        this.currenttd = res;
        console.log(res.values._id);
        alert('Tạo thực đơn thành công! Chọn món và số lượng vào thực đơn vừa tạo!');
        this.getlistthucdon();
        this.formStatus = 'addmon';
      }
    });
  }
  tinhgiathucdontheomonan(sl, gia, km) {
    if (km > 0) {
      return sl * gia - (sl * gia * km / 100);
    }
    return sl * gia;
  }
  kiemtramondachonchotd(item) {
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    if (data && data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        if (item._id === data[i].item._id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
  huymonantrongthucdon(item) {
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    if (data && data.length !== 0) {
      console.log('davao');
      data.forEach(element => {
        if (item._id === element.item._id) {

          const index = data.indexOf(element);
          data.splice(index, 1);
          // tslint:disable-next-line:max-line-length
          this.tdtotal = (this.tdtotal + (this.tdtotal * this.currenttd.values.khuyenmai / 100)) - (item.slma * item.gia - (item.slma * item.gia * item.khuyenmai / 100));
          item.slma = 0;
        }
      });
      sessionStorage.setItem('admintd', JSON.stringify(data));
    }
  }
  themmonanhd(item) {
    this.tdmnTemp._idmonan = item._id;
    this.tdmnTemp.soluong = this.countTemp;
    this.tdmnTemp._idthucdon = this.menuTemp._id;
    console.log(this.tdmnTemp);

    this.listmon.forEach(element => {
      if (element._id === item._id) {
        element['slma'] = 1;
      }
    });

    this.cartsv.addTotd(item, 1);
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    let tong = 0;
    data.forEach(element => {
      tong = tong + this.tinhgiathucdontheomonan(element.sl, element.item.gia, element.item.khuyenmai);
    });
    this.tdtotal = tong - (this.currenttd.values.khuyenmai * tong / 100);

    // this.menuS.taothucdonmonan(this.tdmnTemp).subscribe(res => {
    //   if (res) {
    //     this.styletemp = 'color: #4caf50 !important';
    //   }
    // });
  }
  themtdvaocsdl() {
    const td = JSON.parse(sessionStorage.getItem('admintd'));
    td.forEach(element => {
      const data = {
        _idthucdon: this.currenttd.values._id,
        _idmonan: element.item._id,
        soluong: element.sl
      };
      this.menuS.taothucdonmonan(data).subscribe(res => {
        console.log(res);
      });
    });
  }
  xoatd(id) {
    this.menuS.xoaThucDonMonAn(id).subscribe(res => {
      this.menuS.xoathucdon(id).subscribe(res => {
        alert('xoa thanh cong!');
        this.getlistthucdon();
      })
    })
  }
}
