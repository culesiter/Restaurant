import { Icustomer } from './../../share/entities/icustomer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listcart',
  templateUrl: './listcart.component.html',
  styleUrls: ['./listcart.component.scss']
})
export class ListcartComponent implements OnInit {
  private luaChon: number = 1;
  private khachhang: Icustomer;
  constructor() { }

  ngOnInit() {
    this.kiemTraKhachHang();
  }
  kiemTraKhachHang() {
    this.khachhang = JSON.parse(localStorage.getItem('user'))
  };
  chon(giaTri) {
    if(giaTri==2)
    {
      if(this.khachhang)
      {
        this.luaChon = giaTri;
      }
      else{
        alert('Vui Lòng Đăng Nhập Dể Sử Dụng Tính Năng Này !');
      }
    }
    
  }

}
