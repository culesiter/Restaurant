import { Iphongstore } from './../entities/iphongstore';
import { Iphong } from './../entities/iphong';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { IloaiPhong } from '../entities/iloai-phong';

@Injectable()
export class PhongserviceService {
  private phongurl = "http://localhost:3000/phong";
  private lpurl ='http://localhost:3000/loaiphong';
  private phong: Iphongstore = {};
  private phongs: Iphongstore[] = [];
  constructor(private http: Http) { }
  upanh(id,img): Observable<any> {
    return this.http.put(this.phongurl +'/img/'+ id, img).map(res => {
      return res.json();
   });
  }
  upanhloai(id,img): Observable<any> {
    return this.http.put(this.lpurl +'/img/'+ id, img).map(res => {
      return res.json();
   });
  }
  themphong(data): Observable<any> {
    return this.http.post(this.phongurl, data).map(res => {
      return res.json();
   });
  }
  xoaphong(id): Observable<Iphong>{
    return this.http.delete(this.phongurl +'/'+ id).map(res => res.json() as Iphong);
  }
  suaphong(id,data): Observable<Iphong>{
    return this.http.put(this.phongurl + '/' + id, data).map(res => res.json() as Iphong);
  }
  laydanhsachphong(): Observable<Iphong[]> {
    return this.http.get(this.phongurl).map(respose =>  respose.json() as Iphong[]);
  }
  // laydanhsachphongtheoid(id): Observable<Iphong[]> {
  //   return this.laydanhsachphong().map(response => response)
  // }
  themvaophong(sp: Iphong) {
    this.phong = { item: sp, sl: 1 };
    if (localStorage.getItem('phong') === null) {
      this.phongs.push(this.phong);
      localStorage.setItem('phong', JSON.stringify(this.phongs));
    } else {
      this.phongs = JSON.parse(localStorage.getItem('phong'));
      let index = -1;
      for (let i = 0; i < this.phongs.length; i++) {
        if (this.phongs[i].item._id === sp._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        this.phongs.push(this.phong);
        localStorage.setItem('phong', JSON.stringify(this.phongs));
      }
    }
  }
  huyphong(phong: Iphong) {
    this.phongs = JSON.parse(localStorage.getItem('phong'));
    this.phongs.forEach(element => {
      if (element.item._id == phong._id) {
        console.log(this.phongs.indexOf(element));
        var index = this.phongs.indexOf(element);
        this.phongs.splice(index, 1);
        localStorage.setItem('phong', JSON.stringify(this.phongs));
      }
    })

  }
//loaiphong
themloaiphong(data): Observable<any> {
  return this.http.post(this.lpurl, data).map(res => {
    return res.json();
 });
}
xoaloaiphong(id): Observable<IloaiPhong>{
  return this.http.delete(this.lpurl +'/'+ id).map(res => res.json() as IloaiPhong);
}
sualoaiphong(id,data): Observable<IloaiPhong>{
  return this.http.put(this.lpurl + '/' + id, data).map(res => res.json() as IloaiPhong);
}
laydanhsachloaiphong(): Observable<IloaiPhong[]> {
  return this.http.get(this.lpurl).map(respose =>  respose.json() as IloaiPhong[]);
}

layidserve(): Observable<any> {
  return this.http.get('http://ipinfo.io').map(respose =>  respose.json());
}
}
