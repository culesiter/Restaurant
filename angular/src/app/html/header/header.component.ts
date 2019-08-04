import { AppModule } from './../../app.module';
import { CartserviceService } from './../../share/services/cartservice.service';
import { DishserviceService } from './../../share/services/dishservice.service';
import { Router } from '@angular/router';
import { Icustomer } from './../../share/entities/icustomer';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../share/services/login.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() mo: boolean;
  private khachhang: any[];
  luaChon: number;
  private url: string;
  private email = new FormControl();
  private matkhau = new FormControl();
  private x;

  constructor(private router: Router, private login: LoginService) { }

  ngOnInit() {

    document.getElementById("head1").style.top = "0";
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (currentScrollPos < 110) {
        document.getElementById("head1").style.top = "0";
      } else {
        document.getElementById("head1").style.top = "-53px";
      }
      // prevScrollpos = currentScrollPos;
    }


    this.kiemTraUrl();
    this.kiemTraKhachHang();

  }

  kiemTraTop() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("head1").style.top = "0";
      } else {
        document.getElementById("head1").style.top = "-50px";
      }
      prevScrollpos = currentScrollPos;
    }
  }
  kiemTraUrl() {
    this.url = this.router.url;
  }
  dangNhap() {
    this.login.login(this.email.value, this.matkhau.value).subscribe(response => {
      if (response.message === 'dang nhap thanh cong') {
        $.notify('Đăng nhập thành công!', 'success');
        const user = JSON.stringify(response);
        localStorage.setItem('user', user);
        this.khachhang = JSON.parse(localStorage.getItem('user'));
      } else {
        $.notify("Sai Email hoặc Password!", "error");
      }
    });

  }
  chon(giatri) {
    this.kiemTraUrl();
    console.log(this.url);


    this.luaChon = giatri;

  }
  dangXuat() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('cart1');
    localStorage.removeItem('dichvu');
    localStorage.removeItem('thoidiemden');
    localStorage.removeItem('phong');
    localStorage.removeItem('thoidiemden_temp');
    localStorage.removeItem('phong_temp');
    this.kiemTraKhachHang();
  }
  kiemTraKhachHang() {
    this.khachhang = JSON.parse(localStorage.getItem('user'));
  }

}
