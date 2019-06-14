import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Ihoadon } from '../entities/ihoadon';

@Injectable()
export class HoadonService {
  private url = "http://localhost:3000/hoadon";
  private urlcthd = "http://localhost:3000/chitiethoadon";
  private urlp = "http://localhost:3000/phong";
  private urldv= "http://localhost:3000/chitietdichvu";
  constructor(private http: Http) { }
  them(data): Observable<Ihoadon> {
    console.log(data);
    return this.http.post(this.url, data).map(res => {
      console.log(res);
      return res.json() as Ihoadon;
    });
  }
  xoa(id): Observable<Ihoadon> {
    return this.http.delete(this.url + '/' + id).map(res => res.json() as Ihoadon);
  }
  sua(id, data): Observable<Ihoadon> {
    return this.http.put(this.url + '/' + id, data).map(res => res.json() as Ihoadon);
  }
  huy(id): Observable<any[]> {
    return this.http.get(this.url + '/huy/' + id).map(res => res.json() as any[]);
  }
  laydanhsach(): Observable<Ihoadon[]> {
    return this.http.get(this.url).map(respose => respose.json() as Ihoadon[]);
  }
  laydanhsachtheokh(id): Observable<any[]> {
    return this.http.get(this.url + '/ng/?idkh=' + id).map(respose => respose.json() as any[]);
  }
  laydanhsachtheoid(id): Observable<any[]> {
    return this.http.get(this.url + '/id/?id=' + id).map(respose => respose.json() as any[]);
  }
  getCTHD(id): Observable<any> {
    return this.http.get(this.urlcthd + '/' + id).map(res => res.json());
  }
  getCTHDMA(id): Observable<any> {
    return this.http.get(this.urlcthd + '/' + id).map(res => res.json());
  }
  layphongtheoid(id): Observable<any[]> {
    return this.http.get(this.urlp + '/ph?id=' + id).map(respose => respose.json() as any[]);
  }
  laydichvutheoid(id): Observable<any[]> {
    return this.http.get(this.urldv + '/?id=' + id).map(respose => respose.json() as any[]);
  }
}
