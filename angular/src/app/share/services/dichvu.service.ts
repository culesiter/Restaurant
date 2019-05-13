import { Idichvustore } from './../entities/idichvustore';
import { Idichvu } from './../entities/idichvu';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinct';
@Injectable()
export class DichvuService {
  private dvURL = 'http://localhost:3000/dichvu';
  private ctdvurl='http://localhost:3000/chitietdichvu';
  private dichvu: Idichvustore = {};
  private dichvus: Idichvustore[] = [];

  constructor(private http: Http) { }
  xoaDV(id): Observable<Idichvu>{
    return this.http.delete(this.dvURL +'/'+ id).map(res => res.json() as Idichvu);
  }
  suaDV(id,data): Observable<Idichvu>{
    return this.http.put(this.dvURL + '/' + id, data).map(res => res.json() as Idichvu);
  }
  laydanhsachDV(): Observable<Idichvu[]> {
    return this.http.get(this.dvURL).map(respose =>  respose.json() as Idichvu[]);
  }
  themDV(data): Observable<any> {
    return this.http.post(this.dvURL, data).map(res => {
      return res.json();
   });
  }
  themCtdv(data): Observable<any> {
    return this.http.post(this.ctdvurl, data).map(res => {
      return res.json();
   });
  }
  upanh(id,img): Observable<any> {
    return this.http.put(this.dvURL +'/img/'+ id, img).map(res => {
      return res.json();
   });
  }
  themvaodichvu(sp: Idichvu) {
    this.dichvu = { item: sp, sl: 1 };
    if (localStorage.getItem('dichvu') === null) {
      this.dichvus.push(this.dichvu);
      localStorage.setItem('dichvu', JSON.stringify(this.dichvus));
    } else {
      this.dichvus = JSON.parse(localStorage.getItem('dichvu'));
      let index = -1;
      for (let i = 0; i < this.dichvus.length; i++) {
        if (this.dichvus[i].item._id === sp._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        this.dichvus.push(this.dichvu);
        localStorage.setItem('dichvu', JSON.stringify(this.dichvus));
      }


    }
  }
  huyphong(dichvu: Idichvu) {
    this.dichvus = JSON.parse(localStorage.getItem('dichvu'));

    this.dichvus.forEach(element => {
      if (element.item._id == dichvu._id) {
        console.log(this.dichvus.indexOf(element));
        var index = this.dichvus.indexOf(element);
        this.dichvus.splice(index, 1);
        localStorage.setItem('dichvu', JSON.stringify(this.dichvus));
      }
    });
  }


}
