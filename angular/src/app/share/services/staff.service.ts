import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Icustomer } from '../entities/icustomer';
@Injectable()
export class StaffService {
  private url = "http://localhost:3000/nhanvien";
  private urll = "http://localhost:3000/bangluong";

  constructor(private http: Http) { }
  laynhanvientheoid(id): Observable<any[]> {
    return this.http.get(this.url + '/id/?id=' + id).map(respose => respose.json() as any[]);
  }
  them(data): Observable<any> {
    return this.http.post(this.url, data).map(res => {
      return res.json();
    });
  }
  laybangluongtheoid(id): Observable<any[]> {
    return this.http.get(this.urll + '/id/?id=' + id).map(respose => respose.json() as any[]);
  }
  thembangluong(data): Observable<any> {
    return this.http.post(this.urll, data).map(res => {
      return res.json();
    });
  }
  xoa(id): Observable<any> {
    return this.http.delete(this.url + '/' + id).map(res => res.json() as any);
  }
  sua(id, data): Observable<any> {
    return this.http.put(this.url + '/' + id, data).map(res => res.json() as any);
  }
  laydanhsach(): Observable<any[]> {
    return this.http.get(this.url).map(respose => respose.json() as any[]);
  }
  laydanhsachdatinh(): Observable<any[]> {
    return this.http.get(this.urll).map(respose => respose.json() as any[]);
  }
  upanhkh(id, img): Observable<any> {
    return this.http.put(this.url + '/img/' + id, img).map(res => {
      return res.json();
    });
  }
  laydscapnv(): Observable<any[]> {
    return this.http.get('http://localhost:3000/capnhanvien').map(respose => respose.json() as any[]);
  }
  xoacbnv(id): Observable<any> {
    return this.http.delete('http://localhost:3000/capnhanvien' + '/' + id).map(res => res.json() as any);
  }
  themcbnv(data): Observable<any> {
    return this.http.post('http://localhost:3000/capnhanvien', data).map(res => {
      return res.json();
    });
  }
}
