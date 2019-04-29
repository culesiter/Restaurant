import { Idish } from './../../share/entities/idish';
import { DishserviceService } from './../../share/services/dishservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../share/services/cartservice.service';

@Component({
  selector: 'app-detaildish',
  templateUrl: './detaildish.component.html',
  styleUrls: ['./detaildish.component.scss']
})
export class DetaildishComponent implements OnInit {

  private dish: Idish = {};
  constructor(private router: ActivatedRoute, private dishservice: DishserviceService,private cartService: CartserviceService) { }

  ngOnInit() {
    this.layMonAn()
  }
  addToCart(dish) {
    this.cartService.addTocart(dish);
    this.cartService.change();
    this.cartService.nhay();
  }
  layMonAn() {
    this.router.params.subscribe(pramas => {
      const id = pramas['id'];
      this.dishservice.layMonAnTheoId(id).subscribe(response => {
        this.dish = response;
      })
    })

  }
}
