import { CartserviceService } from './../../share/services/cartservice.service';
import { Component, OnInit } from '@angular/core';
import { ThucdonserviceService } from '../../share/services/thucdonservice.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private count: number;
  private timeout = null;
  private muaNhay: boolean;
  private check_Click: Boolean = false;
  constructor(private thucdonservice: ThucdonserviceService, private cartService: CartserviceService) { }


  ngOnInit() {
    // $('#cart').on('click', function () {
    //   $('#cart').addClass('animated jello');
    //   setTimeout(function () {
    //     $('#cart').removeClass('animated jello');
    //   }, 1000);
    // });

    // document.getElementById('cart').onclick()




    this.thucdonservice.laydanhsachThucDon().subscribe(response => {
      localStorage.setItem('thucdon', JSON.stringify(response));
    })
    this.getCount();

    this.layKetQua();
  }
  layKetQua() {
    this.cartService.layketqua().subscribe(response => {
      this.muaNhay = response;
      setTimeout(() => {
        this.muaNhay = false;
      }, 1000);
    })
    

  }
  getCount() {
    this.cartService.getcount().subscribe(response => {
      this.count = response
      
    })
  }

  nhay() {
    this.check_Click = true;

    setTimeout(() => {
      this.check_Click = false;
    }, 1000);
  }

}
