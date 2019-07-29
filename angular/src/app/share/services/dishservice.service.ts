
import { Idish } from './../entities/idish';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { log } from 'util';
import { iloaimon } from '../entities/iloaimon';

@Injectable()
export class DishserviceService {
    private dishurl = 'http://localhost:3000/monan';
    private loaimonURL = 'http://localhost:3000/loaimon';
    constructor(private http: Http) { }


    laydanhsachmonan(): Observable<Idish[]> {
        return this.http.get(this.dishurl).map(respose => respose.json() as Idish[]);
    }
    layMonAnTheoId(id): Observable<Idish> {
        return this.laydanhsachmonan().map(response => response.find(res => res._id === id));
    }
    upanh(id, img): Observable<any> {
        return this.http.put(this.dishurl + '/img/' + id, img).map(res => {
            return res.json();
        });
    }
    themMonaAn(monan): Observable<any> {
        return this.http.post(this.dishurl, monan).map(res => {
            return res.json();
        });
    }
    xoaMonAn(id): Observable<Idish> {
        return this.http.delete(this.dishurl + '/' + id).map(res => res.json());
    }
    suaMonAn(id, data): Observable<Idish> {
        return this.http.put(this.dishurl + '/' + id, data).map(res => res.json() as Idish);
    }
    // loaimonan
    laydsloaimon(): Observable<Idish[]> {
        return this.http.get(this.loaimonURL).map(respose => respose.json() as iloaimon[]);
    }
    themloaimon(data): Observable<iloaimon> {
        return this.http.post(this.loaimonURL, data).map(res => {
            return res.json as iloaimon;
        });
    }
    xoaloaimon(id): Observable<iloaimon> {
        return this.http.delete(this.loaimonURL + '/' + id).map(res => res.json() as iloaimon);
    }
    sualoaimon(id, data): Observable<iloaimon> {
        return this.http.put(this.loaimonURL + '/' + id, data).map(res => res.json() as iloaimon);
    }
}
