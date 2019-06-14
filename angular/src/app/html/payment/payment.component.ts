
import { Idichvustore } from './../../share/entities/idichvustore';
import { Icart } from './../../share/entities/icart';
import { Icustomer } from './../../share/entities/icustomer';
import { Component, OnInit } from '@angular/core';
import { Iphongstore } from '../../share/entities/iphongstore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../share/services/login.service';
import { Router } from '@angular/router';
import { HumanService } from '../../share/services/human.service';
import { DichvuService } from '../../share/services/dichvu.service';
const moment = require('moment');
declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  private thoidiemtao: Date;
  private khachhang: Icustomer;
  private newkhachhang: Icustomer;
  private cart: Icart[] = [];
  private cart1: Icart[] = [];
  private tongTien: number;
  private tienthucdon: number;
  private sua: number = 0;
  private phongstore: Iphongstore[] = [];
  private dichVuStore: Idichvustore[] = [];
  private luu = false;
  private frmThanhToan: FormGroup;
  private ngayden: string;
  private buoiden;
  private sang = true;
  private chieu = true;
  private buoiDat = 0;
  private dem = 0;
  private check = true;
  private phong;
  private doi = false;
  constructor(private formBuilder: FormBuilder,
    private gettime: LoginService,
    private router: Router,
    private customer: HumanService,
    private dichvu: DichvuService) { }
  today = new Date();
  ngOnInit() {
    this.newkhachhang = {};
    this.taoFormThanhToan();
    this.sua = 0;
    this.kiemTraNguoiDung();
    this.tongTien = this.thucDon();
    this.tienthucdon = this.thucDon1();
    if (this.tienthucdon && !this.thucDon()) {
      this.tongTien = this.tienthucdon;
    } else if (!this.tienthucdon && this.thucDon()) {
      this.tongTien = this.thucDon();
    } else if (this.tienthucdon && this.thucDon()) {
      this.tongTien = this.tienthucdon + this.thucDon();
    } else {
      this.tongTien = 0;
    }
    this.layPhongStore();
    this.layDichVuStore();
    this.ngayden = JSON.parse(localStorage.getItem('thoidiemden'));
  }


  chonbuoisang() {
    this.buoiDat = 1;
    this.buoiden = "sang";
  }
  chonbuoichieu() {
    this.buoiDat = 2;
    this.buoiden = "chieu";
  }
  laythoigian(event) {
    if (new Date(event.target.value) < this.today) {
      this.check = false;
      return false;
    }
    this.check = true;
    this.doi = true;
    const phong = JSON.parse(localStorage.getItem('phong'));
    this.gettime.gettime(moment(new Date(event.target.value)).format('DD-MM-YYYY'), phong[0].item._id).subscribe(Response => {
      let data = [];
      data = Response.map(res => {
        return res.buoiDat;
      });
      this.doi = false;
      this.sang = true;
      this.chieu = true;
      for (let i = 0; i <= data.length; i++) {
        if (1 === data[i]) {
          this.sang = false;
        } else if (2 === data[i]) {
          this.chieu = false;
        } else if (3 === data[i]) {
          this.chieu = false;
          this.sang = false;
        }
      }
      localStorage.setItem('thoidiemden', JSON.stringify(moment(new Date(event.target.value)).format('DD-MM-YYYY')));
      this.ngayden = moment(new Date(event.target.value)).format('DD-MM-YYYY');
    });

  }
  time() {
    const thoidiemden = JSON.parse(localStorage.getItem('thoidiemden'));
    this.khachhang = {
      ten: this.frmThanhToan.value.ten,
      sdt: this.frmThanhToan.value.sdt
    };
  }
  taohoadon() {
    const phong = JSON.parse(localStorage.getItem('phong'));
    const khachhang = JSON.parse(localStorage.getItem('user'));
    const thoidiemden = JSON.parse(localStorage.getItem('thoidiemden'));
    let buoidat = JSON.parse(localStorage.getItem('buoi'))[0].buoiDat;
    if (buoidat.length == 2) {
      buoidat = 3;
    }
    if (khachhang) {
      const data = {
        _idphong: phong[0].item._id,
        _idkhachhang: khachhang._id,
        thoidiemden: thoidiemden,
        buoiDat: buoidat,
        tongtien: this.tongTien + this.tinhTienPhong() + this.tinhTienDichVu()
      };
      this.gettime.themhoadon(data).subscribe(response => {
        console.log(response.values);
        if (response.message === 'luu thanh cong') {
          const monan = JSON.parse(localStorage.getItem('cart'));
          if (monan) {
            for (let i = 0; i < monan.length; i++) {
              const rr = {
                _idhoadon: response.values._id,
                _idmonan: monan[i].item._id,
                soluongmonan: monan[i].sl
              };
              this.gettime.themcthd(rr).subscribe(res => {
                console.log(res);
              });
            }
          }
          const thucDon = JSON.parse(localStorage.getItem('cart1'));
          if (thucDon) {
            for (let i = 0; i < thucDon.length; i++) {
              const rr = {
                _idhoadon: response.values._id,
                _idthucdon: thucDon[i].thucdon._id,
                soluongthucdon: thucDon[i].sl
              };
              this.gettime.themcthd(rr).subscribe(res => {
                console.log(res);
              });
            }
          }
          const dichvu = JSON.parse(localStorage.getItem('dichvu'));
          if (dichvu) {
            for (let i = 0; i < dichvu.length; i++) {
              const rr = {
                _idhoadon: response.values._id,
                _iddichvu: dichvu[i].item._id,
              };
              this.dichvu.themCtdv(rr).subscribe(res => {
                console.log(res);
              });
            }
          }
        }
        alert('ok');
        $('#xacNhan').modal('toggle');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').removeClass('modal-backdrop fade in')
        this.router.navigate(['/home']);
        localStorage.removeItem('cart');
        localStorage.removeItem('cart1');
        localStorage.removeItem('dichvu');
        localStorage.removeItem('thoidiemden');
        localStorage.removeItem('phong');
      });
    } else {
      this.customer.themtknoaccount(this.frmThanhToan.value).subscribe(Response => {
        console.log(Response);
        if (Response.message === 'tao thanh cong') {
          const data = {
            _idphong: phong[0].item._id,
            _idkhachhang: Response.values._id,
            thoidiemden: thoidiemden,
            buoiDat: buoidat,
            tongtien: this.tongTien + this.tinhTienPhong() + this.tinhTienDichVu()
          };
          this.gettime.themhoadon(data).subscribe(response => {
            console.log(response.values);
            if (response.message === 'luu thanh cong') {
              const monan = JSON.parse(localStorage.getItem('cart'));
              if (monan) {
                for (let i = 0; i < monan.length; i++) {
                  const rr = {
                    _idhoadon: response.values._id,
                    _idmonan: monan[i].item._id,
                    soluongmonan: monan[i].sl
                  };
                  this.gettime.themcthd(rr).subscribe(res => {
                    console.log(res);
                  });
                }
              }
              const thucDon = JSON.parse(localStorage.getItem('cart1'));
              if (thucDon) {
                for (let i = 0; i < thucDon.length; i++) {
                  const rr = {
                    _idhoadon: response.values._id,
                    _idthucdon: thucDon[i].thucdon._id,
                    soluongmonan: thucDon[i].soluong
                  };
                  this.gettime.themcthd(rr).subscribe(res => {
                    console.log(res);
                  });
                }
              }
            }
            alert('ok');
            $('#xacNhan').hide();
            $('body').removeClass('modal-open');
            $('.modal-backdrop').removeClass('modal-backdrop fade in');
            this.router.navigate(['/home']);
            localStorage.removeItem('cart');
            localStorage.removeItem('cart1');
            localStorage.removeItem('dichvu');
            localStorage.removeItem('thoidiemden');
            localStorage.removeItem('phong');
          });
        }
      });
    }
  }
  giatri(time) {
    console.log(time);
  }
  taoFormThanhToan() {
    this.frmThanhToan = this.formBuilder.group({
      ten: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9%-_]{4,32}@gmail.com$')
      ]],
      sdt: ['', [
        Validators.required,
        Validators.pattern('^(0)[0-9]{9,10}$')
      ]]
    });
  }
  luuf() {
    console.log(this.frmThanhToan.value);
  }
  tinhTienDichVu() {
    var dichvu: Idichvustore[] = JSON.parse(localStorage.getItem('dichvu'));
    var tong: number = 0;
    if (dichvu) {
      dichvu.map(res => { return tong = tong + (res.item.gia) });
      return tong;
    }
    return 0;
  }
  layDichVuStore() {
    this.dichVuStore = JSON.parse(localStorage.getItem('dichvu'));
    // if (this.dichVuStore) {
    //   this.mangiddichvu = this.dichVuStore.map(res => { return res.item._id });
    // }
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
    // if (this.phongstore)
    //   this.mang = this.phongstore.map(res => { return res.item._id });
  }
  chinhSua() {
    this.sua = 1;
  }
  ok() {
    this.sua = 0;
  }
  thayDoiGiaTri(value, item) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.forEach(element => {
      if (element.item._id == item.item._id) {
        element.sl = parseInt(value);
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.tongTien = this.thucDon();
  }
  xoaThucDon(id) {
    this.cart1 = JSON.parse(localStorage.getItem('cart1'));
    this.cart1.forEach(element => {
      if (element.thucdon._id == id) {
        var index = this.cart1.indexOf(element);
        this.cart1.splice(index, 1);
        localStorage.setItem('cart1', JSON.stringify(this.cart1));
        this.tienthucdon = this.thucDon1();
      }
    });
  }
  xoa(id) {
    var tong = 0;
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.forEach(element => {
      if (element.item._id == id) {
        var index = this.cart.indexOf(element);
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.tongTien = this.thucDon();
      }
    });
    if (this.cart.length == 0) {
    }
  }
  thucDon() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    var tong = 0;
    if (this.cart != null) {
      this.cart.forEach(element => {
        tong = tong + (element.item.gia * element.sl)
      })
      return tong;
    }
  }
  thucDon1() {
    this.cart1 = JSON.parse(localStorage.getItem('cart1'));
    var tong = 0;
    if (this.cart1 != null) {
      this.cart1.forEach(element => {
        tong = tong + (element.thucdon.gia * element.sl);
      })
      return tong;
    }
  }
  kiemTraNguoiDung() {
    this.khachhang = JSON.parse(localStorage.getItem('user'));
    if (!this.khachhang) {
      this.khachhang = {
        ten: '',
        sdt: ''
      };
    }
  }
}
