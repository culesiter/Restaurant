import { Component, OnInit } from '@angular/core';
import { Ithucdon } from '../../share/entities/ithucdon';
import { Ithucdoninter } from '../../share/entities/ithucdoninter';
import { ThucdonserviceService } from '../../share/services/thucdonservice.service';
import { CartserviceService } from '../../share/services/cartservice.service';

@Component({
  selector: 'app-thucdon-example',
  templateUrl: './thucdon-example.component.html',
  styleUrls: ['./thucdon-example.component.scss']
})
export class ThucdonExampleComponent implements OnInit {

  private thucdons: Ithucdoninter[] = [];
  private thucdonexs: Ithucdoninter[] = [];
  constructor(private thucdonservice: ThucdonserviceService, private cartService: CartserviceService) { }

  ngOnInit() {

    this.trinhThucDon();
  }
  trinhThucDon() {
    this.thucdonservice.laydanhsachmonanTrungBay().subscribe(response => {
      this.thucdons = response;
      this.thucdons.map(res => {
        res.gia = this.giaThucDon(res._id);
        res.danhsachtenmonan = this.danhSachMonAn(res._id);
      })
      for (let i = 0; i < this.thucdons.length; i++) {
        this.thucdonexs.push(this.thucdons[i]);
      }
      console.log(this.thucdonexs);
    });
  }
  giaThucDon(id) {
    let tong = 0;
    const thucdon: Ithucdon[] = JSON.parse(localStorage.getItem('thucdon'));
    thucdon.forEach(element => {
      if (element._idthucdon === id) {
        tong = tong + element.gia;
      }
    })
    return tong;
  }
  danhSachMonAn(id) {
    const mang: any[] = [];
    const thucdon: Ithucdon[] = JSON.parse(localStorage.getItem('thucdon'));
    thucdon.forEach(element => {
      if (element._idthucdon === id) {
        const data = {
          ten: element.tenmonan,
          gia: element.gia
        };
        mang.push(data);
      }
    });
    return mang;
  }







}