import { Ithucdoninter } from './../entities/ithucdoninter';
import { Ithucdon } from './../entities/ithucdon';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinct';
import { Ithucdonmonan } from '../entities/ithucdonmonan';
@Injectable()
export class ThucdonserviceService {
    private thucdonurl = "http://localhost:3000/thucdonmonan";
    private thucdoninterurl = "http://localhost:3000/thucdon";
    constructor(private http: Http) { }
    taothucdon(data): Observable<any> {
        return this.http.post(this.thucdoninterurl, data).map(res => {
            return res.json() as any;
        });
    }
    laydanhsachThucDon(): Observable<Ithucdon[]> {
        return this.http.get(this.thucdonurl).map(respose => respose.json() as Ithucdon[])
    }
    laydstd(): Observable<Ithucdon[]> {
        return this.http.get(this.thucdoninterurl).map(respose => respose.json())
    }
    laydanhsachmonanTheoId(id) {
        this.laydanhsachThucDon().subscribe(response => {
            response.map(res => {
                if (res._idthucdon == "2") {
                    console.log(res);
                }
            })
        })
    }
    laydanhsachmonanTrungBay(): Observable<Ithucdoninter[]> {
        return this.http.get(this.thucdoninterurl).map(respose => respose.json() as Ithucdoninter[])
    }
    getmonantheoIdthucdon(id): Observable<any[]> {
        return this.http.get(this.thucdoninterurl + '/monantheothucdon/' + id).map(respose => respose.json())
    }
    // thucdonmonan
    taothucdonmonan(data): Observable<Ithucdonmonan> {
        return this.http.post(this.thucdonurl, data).map(res => {
            return res.json();
        });
    }
    xoaThucDonMonAn(id): Observable<any> {
        return this.http.delete(this.thucdonurl + '/' + id).map(res => {
            return res.json();
        });
    }
    xoathucdon(id): Observable<any>{
        return this.http.delete(this.thucdoninterurl + '/' + id).map(res => {
            return res.json();
        });
    }
}
