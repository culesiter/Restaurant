import { Icustomer } from './../../share/entities/icustomer';
import { Idichvustore } from './../../share/entities/idichvustore';
import { Idichvu } from './../../share/entities/idichvu';
import { DichvuService } from './../../share/services/dichvu.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Iphongstore } from './../../share/entities/iphongstore';
import { element } from 'protractor';
import { Iphong } from './../../share/entities/iphong';
import { CartserviceService } from './../../share/services/cartservice.service';
import { Icart } from './../../share/entities/icart';
import { Component, OnInit } from '@angular/core';
import { PhongserviceService } from '../../share/services/phongservice.service';

declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private open: number;
  private motien: number;
  private tinhtrangphongstore: number;
  private tongTien: number;
  private tienphong: number;
  private tienthucdon: number;
  private tiendichvu: number;
  private cart: Icart[] = [];
  private cart1: Icart[] = [];
  private phong: Iphong[] = [];
  private phongstore: Iphongstore[] = [];
  private mang: string[] = [];
  private dichVuStore: Idichvustore[] = [];
  private mangiddichvu: string[] = [];
  private dichvus: Idichvu[] = [];
  private frmTimKiem: FormGroup;
  private phongChon: Iphong;
  constructor(private dichvuservice: DichvuService, private formbuilder: FormBuilder, private cartService: CartserviceService, private phongservice: PhongserviceService) { }


  ngOnInit() {


    this.taoFormTimKiem();    // this.layPhongStore();
    this.laydanhsachphong();
    this.taoCart();
    this.tienthucdon = this.tinhTienThucDon();
    this.congthuctinhtongtienan();
    this.tienphong = this.tinhTienPhong();
    if (this.tienphong == null) {
      this.tienphong = 0;
    }
    this.tiendichvu = this.tinhTienDichVu();
    if (this.tiendichvu == null) {
      this.tiendichvu = 0;
    }
    this.kiemTraCart();
    this.kiemTraPhongVuaDat();
    this.kiemTraHienTien();
    this.trungDichVu();
    this.kiemTraHienTienDichVu();
    this.kiemTraKhachhang();
    this.kiemTraPhongStore();
  }
  congthuctinhtongtienan() {
    if (this.tienthucdon && !this.tinhTongTien()) {
      this.tongTien = this.tienthucdon;
    } else if (!this.tienthucdon && this.tinhTongTien()) {
      this.tongTien = this.tinhTongTien();
    } else if (this.tienthucdon && this.tinhTongTien()) {
      this.tongTien = this.tienthucdon + this.tinhTongTien();
    } else {
      this.tongTien = 0;
    }
  }
  thongBao() {
    if (this.kiemTraPhongStore() === false) {
      $('#nutPhong').addClass(' nut ');
      alert('VUI LONG CHON PHONG');
      setTimeout(() => {
        $('#nutPhong').removeClass('nut');
      }, 1000);
    }
  }
  kiemTraPhongStore() {
    var phong = JSON.parse(localStorage.getItem('phong'));
    if (phong) {
      if (phong.length == 0) {
        return false;
      }
      return true;
    }
    else {
      return false
    }
  }
  kiemTraKhachhang() {
    var khachhang = JSON.parse(localStorage.getItem('user'));
    if (khachhang) {
      return true;
    }
    return false;
  }
  tinhTienDichVu() {

    var dichvu: Idichvustore[] = JSON.parse(localStorage.getItem('dichvu'));
    var tong: number = 0;
    if (dichvu) {

      dichvu.map(res => { return tong = tong + (res.item.gia) })
      return tong;
    }
  }
  huyDichVu(dichvu) {
    this.dichvuservice.huyphong(dichvu);
    this.layDichVuStore();
    this.tiendichvu = this.tinhTienDichVu();
  }
  chonDichVu(item) {
    this.dichvuservice.themvaodichvu(item);
    this.layDichVuStore();
    this.tiendichvu = this.tinhTienDichVu();


  }
  trungDichVu() {
    this.dichvuservice.laydanhsachDV().subscribe(response => {
      this.dichvus = response;
    })
  }
  daChon(phong: Iphong) {
    this.phongChon = phong;

  }
  kiemTraDichVuCick(item: Idichvu) {
    this.layDichVuStore();


    for (let i = 0; i < this.mangiddichvu.length; i++) {
      if (this.mangiddichvu[i] == item._id) {

        return true;
      }
    }
  }
  kiemTraHienTienDichVu() {
    var dichvu: Idichvustore[] = JSON.parse(localStorage.getItem('dichvu'));
    if (dichvu) {
      if (dichvu.length == 0) { return true }
      return false
    }
    else return true;
  }
  kiemTraHienTien() {
    if (!this.cart && !this.cart1) {
      this.motien = 1;
    }
    else {
      if (this.cart && this.cart1) {

        console.log(this.cart.length, this.cart1.length);

        if (this.cart.length == 0 && this.cart1.length == 0) {
          return this.motien = 1;
        }
        else if (this.cart.length == 0 && this.cart1.length > 0) {
          console.log('qua');

          return this.motien = 3;
        }
        else if (this.cart1.length == 0 && this.cart.length > 0) {

          console.log('qua1');

          return this.motien = 2;
        }
        this.motien = 0;
      } else if (this.cart && !this.cart1) {
        if (this.cart.length == 0) {
          return this.motien = 3;
        }
        this.motien = 2;
      } else if (!this.cart && this.cart1) {
        if (this.cart1.length == 0) {
          return this.motien = 2;
        }
        this.motien = 3;
      }

    }
    console.log(this.motien);

  }
  kiemTraCart() {
    if (!this.cart && !this.cart1) {
      return this.open = 0;
    } else {
      if (this.cart && this.cart1) {
        if (this.cart.length === 0 && this.cart1.length === 0) {
          return this.open = 0;
        }
        return this.open = 1;
      } else if (this.cart && !this.cart1) {
        if (this.cart.length === 0) {
          return this.open = 0;
        }
        return this.open = 1;
      } else if (!this.cart && this.cart1) {
        if (this.cart1.length === 0) {
          return this.open = 0;
        }
        return this.open = 1;
      } else {
        return this.open = 1;
      }



    }
  }
  taoFormTimKiem() {
    this.frmTimKiem = this.formbuilder.group({
      loai: ['', []]
    });
  }
  timKiemLoaiPhong() {
    this.phongservice.laydanhsachphong().subscribe(response => {
      const phong: Iphong[] = [];
      response.forEach(res => {
        if (res.loai === this.frmTimKiem.value.loai) {
          phong.push(res);
        }
      });
      if (phong.length === 0) {
        return this.phong = response;
      }
      this.phong = phong;
    });
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
  kiemTra(id) {
    this.layPhongStore();
    for (let i = 0; i < this.mang.length; i++) {
      if (this.mang[i] == id) {
        return true;
      }
    }
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
  layPhongStore() {
    this.phongstore = JSON.parse(localStorage.getItem('phong'));


    if (this.phongstore) {
      this.mang = this.phongstore.map(res => { return res.item._id });
    }

  }
  layDichVuStore() {

    this.dichVuStore = JSON.parse(localStorage.getItem('dichvu'));

    if (this.dichVuStore) {


      this.mangiddichvu = this.dichVuStore.map(res => { return res.item._id });
    }
  }
  xoaPhongStore(giatri) {
    this.phongservice.huyphong(giatri);
    this.layPhongStore();
    this.tienphong = this.tinhTienPhong();
    this.kiemTraPhongVuaDat();
    this.kiemTraPhongStore();
  }
  giatriphong(giatri: Iphong) {
    const phong = JSON.parse(localStorage.getItem('phong'));
    if (!phong || phong.length === 0) {
      this.phongChon = giatri;
      this.phongservice.themvaophong(giatri);
      this.layPhongStore();
      this.tienphong = this.tinhTienPhong();
      this.kiemTraPhongVuaDat();
    } else {
      alert('Xin lỗi bạn đã chọn phòng rồi');
    }



  }
  giatriphong1(chon, giatri) {
    if (chon == true) {
      this.phongservice.themvaophong(giatri);

    } else {
      this.phongservice.huyphong(giatri);
    }
    this.layPhongStore();
    this.tienphong = this.tinhTienPhong();


  }
  laydanhsachphong() {
    this.phongservice.laydanhsachphong().subscribe(response => {
      this.phong = response;
    })
  }
  xoa(id) {


    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.forEach(element => {
      if (element.item._id == id) {
        var index = this.cart.indexOf(element);
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.tongTien = this.tinhTongTien();
        this.cartService.change();
      }
      this.kiemTraCart();

    });

    this.congthuctinhtongtienan()

  }
  xoaThucDon(id) {
    this.cart1 = JSON.parse(localStorage.getItem('cart1'));
    this.cart1.forEach(element => {
      if (element.thucdon._id == id) {
        var index = this.cart1.indexOf(element);
        this.cart1.splice(index, 1);
        localStorage.setItem('cart1', JSON.stringify(this.cart1));
        this.tienthucdon = this.tinhTienThucDon();
        this.cartService.change();
      }
      this.kiemTraCart();

    });
     this.congthuctinhtongtienan();
  }
  thayDoiGiaTri(value, item) {



    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.forEach(element => {
      if (element.item._id == item.item._id) {
        element.sl = parseInt(value);
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.taoCart();
    this.cartService.change();
    this.congthuctinhtongtienan();
  }
  taoCart() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart1 = JSON.parse(localStorage.getItem('cart1'));
  };
  tinhTongTien(): number {
    var cart: Icart[] = JSON.parse(localStorage.getItem('cart'));
    var tong = 0;
    if (this.cart != null) {
      cart.forEach(element => {
        tong = tong + (element.item.gia * element.sl)
      })
      return tong;
    }

  };
  tinhTienThucDon() {
    var cart1: Icart[] = JSON.parse(localStorage.getItem('cart1'));
    var tong = 0;
    if (this.cart1 != null) {
      cart1.forEach(element => {
        tong = tong + (element.thucdon.gia * element.sl)
      })
      return tong;
    }
  }
  thayDoiGiaTriThucDon(value, item) {
    this.cart1 = JSON.parse(localStorage.getItem('cart1'));
    this.cart1.forEach(element => {
      if (element.thucdon._id == item.thucdon._id) {
        element.sl = parseInt(value);
      }
    });
    localStorage.setItem('cart1', JSON.stringify(this.cart1));
    this.taoCart();
    this.tienthucdon = this.tinhTienThucDon();
    this.cartService.change();
    this.congthuctinhtongtienan();
  }


}
