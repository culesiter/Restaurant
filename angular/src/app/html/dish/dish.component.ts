import { Router } from '@angular/router';
import { CartserviceService } from './../../share/services/cartservice.service';
import { Idish } from './../../share/entities/idish';
import { Component, OnInit, Input } from '@angular/core';
import { Ithucdon } from '../../share/entities/ithucdon';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  @Input() dish: Idish;
  constructor(private router:Router,private cartService: CartserviceService) { }
  ngOnInit() {
  }
  addToCart(dish) {
    this.cartService.addTocart(dish);
    this.cartService.change();
    this.cartService.nhay();
  }
  denTrangChiTiet(id)
  {
    this.router.navigate(['/home/monan/'+id]);
  }
}
