import { Injectable } from '@angular/core';
import { Idish } from './../entities/idish';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
@Injectable()
export class LoginService {
  private loginurl = 'http://localhost:3000/khachhang/login';
  private hoadon = 'http://localhost:3000/hoadon/gettime';
  private hoadon1 = 'http://localhost:3000/hoadon';
  private cthd = 'http://localhost:3000/chitiethoadon';
  constructor(private http: Http) { }
  gettime(time, Idp): Observable<any> {
    const date = {
      thoidiemden: time,
      _idphong: Idp
    };
    return this.http.post(this.hoadon, date).map(respose => respose.json());
  }
  getlistblankroom(time): Observable<any> {
    const date = {
      thoidiemden: time
    };
    return this.http.post(this.hoadon, date).map(respose => respose.json());
  }
  login(email, matkhau): Observable<any> {
    const user = {
      email: email,
      matkhau: matkhau
    };
    return this.http.post(this.loginurl, user).map(respose => respose.json());
  }
  themhoadon(data): Observable<any> {
    console.log(data);

    return this.http.post(this.hoadon1, data).map(res => {
      return res.json();
    });
  }
  themcthd(data): Observable<any> {
    console.log(data);
    return this.http.post(this.cthd, data).map(res => {
      return res.json();
    });
  }
  thanhtoan(data): Observable<any> {
    return this.http.post('https://manhrestaurant.herokuapp.com/payment/checkout', data).map(res => {
      return res;
    });
  }
}