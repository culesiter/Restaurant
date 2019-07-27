import { Ithucdoninter } from './../../share/entities/ithucdoninter';
import { ThucdonserviceService } from './../../share/services/thucdonservice.service';
import { element } from 'protractor';
import { Ithucdon } from './../../share/entities/ithucdon';
import { Component, OnInit, Input } from '@angular/core';
import { CartserviceService } from '../../share/services/cartservice.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-thucdon',
  templateUrl: './thucdon.component.html',
  styleUrls: ['./thucdon.component.scss']
})
export class ThucdonComponent implements OnInit {
  @Input() thucdon: Ithucdoninter;
  private thucdons: Ithucdoninter[];
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
      });
    });
  }
  giaThucDon(id) {
    var tong = 0;
    var thucdon: Ithucdon[] = JSON.parse(localStorage.getItem('thucdon'));
    thucdon.forEach(element => {
      if (element._idthucdon == id)
        tong = tong + element.gia;
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
  addToCart(thucdon) {
    this.cartService.addTocart1(thucdon);
    this.cartService.change();
    this.cartService.nhay();
  }
  tenMonAn(id) {
    var tong = 0;
    this.thucdonservice.laydanhsachThucDon().subscribe(response => {
      response.map(res => {
        if (res._idthucdon == id) {
          console.log(res);

          tong = tong + res.gia;
        }
      })
      return tong;
    })
  }
}
