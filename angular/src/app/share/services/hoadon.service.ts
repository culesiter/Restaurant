import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Ihoadon } from '../entities/ihoadon';

@Injectable()
export class HoadonService {
  private url = "http://localhost:3000/hoadon";
  constructor(private http: Http) { }
  them(data): Observable<Ihoadon> {
    console.log(data);
    return this.http.post(this.url, data).map(res => {
      console.log(res);
      return res.json() as Ihoadon;
   });
  }
  xoa(id): Observable<Ihoadon>{
    return this.http.delete(this.url +'/'+ id).map(res => res.json() as Ihoadon);
  }
  sua(id,data): Observable<Ihoadon>{
    return this.http.put(this.url + '/' + id, data).map(res => res.json() as Ihoadon);
  }
  laydanhsach(): Observable<Ihoadon[]> {
    return this.http.get(this.url).map(respose =>  respose.json() as Ihoadon[]);
  }
  getCTHD(id): Observable<any>{
    return this.http.get(this.url +'/'+ id).map(res => res.json());
  }
}
