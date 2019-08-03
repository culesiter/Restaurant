import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Icustomer } from '../entities/icustomer';
@Injectable()
export class HumanService {
  private url = "http://localhost:3000/khachhang";
  private urlk = "http://localhost:3000/khachhang/noaccount";
  private urlnv = "http://localhost:3000/nhanvien/login";
  constructor(private http: Http) { }
  upanhkh(id, img): Observable<any> {
    return this.http.put(this.url + '/img/' + id, img).map(res => {
      return res.json();
    });
  }
  them1(data): Observable<any> {
    return this.http.post(this.url, data).map(res => {
      console.log(res);
      return res.json();
    });
  }
  themtknoaccount(data): Observable<any> {
    return this.http.post(this.urlk, data).map(res => {
      console.log(res);
      return res.json();
    });
  }
  them(data): Observable<any> {
    return this.http.post(this.url, data).map(res => {
      return res.json();
    });
  }
  xoa(id): Observable<Icustomer> {
    return this.http.delete(this.url + '/' + id).map(res => res.json() as Icustomer);
  }
  sua(id, data): Observable<Icustomer> {
    return this.http.put(this.url + '/' + id, data).map(res => res.json() as Icustomer);
  }
  laydanhsach(): Observable<Icustomer[]> {
    return this.http.get(this.url).map(respose => respose.json() as Icustomer[]);
  }

  // dangnhap
  login(email, matkhau): Observable<any> {
    const user = {
      ten: email,
      matkhau: matkhau
    };
    return this.http.post(this.urlnv, user).map(respose => respose.json());
  }
  laythongtinkhachhangtheoid(id): Observable<any> {
    return this.http.get('http://localhost:3000/khachhang/id?id=' + id).map(res => res.json());
  }
}
