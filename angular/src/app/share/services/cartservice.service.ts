import { Ithucdoninter } from './../entities/ithucdoninter';
import { Idish } from './../entities/idish';
import { Icart } from './../entities/icart';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Ithucdon } from '../entities/ithucdon';

@Injectable()
export class CartserviceService {
  private cart: Icart;
  private carts: Icart[] = [];
  private cart1: Icart;
  private carts1: Icart[] = [];
  private biennhay: boolean = false;
  private a = this.count();
  private abc = new BehaviorSubject(this.a);
  private guinhay = new BehaviorSubject(this.biennhay);

  constructor() { }
  change() {
    this.abc.next(this.count());
  }
  nhay() {
    this.guinhay.next(this.biennhay = true);
  }
  doi() {
    
    
  }
  layketqua() {
    return this.guinhay.asObservable();
  }
  getcount() {
    return this.abc.asObservable();
  }
  count() {
    let tong = 0;
    let tong1 = 0;
    var count: Icart[] = JSON.parse(localStorage.getItem('cart'));
    var count1: Icart[] = JSON.parse(localStorage.getItem('cart1'));
    if (count != null) {
      count.forEach(element => {
        tong = tong + (element.sl);
      });

    }
    if (count1 != null) {
      count1.forEach(element => {
        tong1 = tong1 + (element.sl);
      });
    }
    return tong + tong1;


  }
  addTocart(sp: Idish) {
    if (sp) {
      this.cart = { item: sp, sl: 1 };
      if (localStorage.getItem('cart') === null) {



        this.carts.push(this.cart);
        localStorage.setItem('cart', JSON.stringify(this.carts));
      } else {

        this.carts = JSON.parse(localStorage.getItem('cart'));
        let index = -1;
        for (let i = 0; i < this.carts.length; i++) {
          if (this.carts[i].item._id === sp._id) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          this.carts.push(this.cart);
          localStorage.setItem('cart', JSON.stringify(this.carts));
        } else {
          const temp: Icart = this.carts[index];
          temp.sl++;
          this.carts[index] = temp;
          localStorage.setItem('cart', JSON.stringify(this.carts));
        }
      }
    }
  }
  addTocart1(sp2: Ithucdoninter) {

    this.cart1 = { thucdon: sp2, sl: 1 };
    if (localStorage.getItem('cart1') === null) {
      this.carts1.push(this.cart1);
      localStorage.setItem('cart1', JSON.stringify(this.carts1));
    } else {
      this.carts1 = JSON.parse(localStorage.getItem('cart1'));
      let index = -1;
      for (let i = 0; i < this.carts1.length; i++) {
        if (this.carts1[i].thucdon._id === sp2._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        this.carts1.push(this.cart1);
        localStorage.setItem('cart1', JSON.stringify(this.carts1));
      } else {
        const temp: Icart = this.carts1[index];
        temp.sl++;
        this.carts1[index] = temp;
        localStorage.setItem('cart1', JSON.stringify(this.carts1));
      }
    }
  }

}
