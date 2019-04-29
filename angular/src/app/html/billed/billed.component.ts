import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
declare var $: any;
@Component({
  selector: 'app-billed',
  templateUrl: './billed.component.html',
  styleUrls: ['./billed.component.scss']
})
export class BilledComponent implements OnInit {
  images;
  constructor() { }

  ngOnInit() {
    // $('.carousel').flickity({
    //   // options
    //   pauseAutoPlayOnHover: false,
    //   wrapAround: true,
    //   autoPlay: 2000,
    //   cellAlign: 'left',
    //   contain: true,
    //   on: {
    //     ready: function() {
    //       console.log('Flickity is ready');
    //     },
    //     change: function( index ) {
    //       console.log( 'Slide changed to' + index );
    //       $('.img').addClass('bag');
    //     }
    //   }
    //   // freeScroll: true,
    //   // wrapAround: true
    // });

    // $(document).ready(function(){
    //   $(".owl-carousel").owlCarousel();
    // });
    // var prevScrollpos = window.pageYOffset;
    // window.onscroll = function() {
    // var currentScrollPos = window.pageYOffset;
    //   if (prevScrollpos > currentScrollPos) {
    //     console.log(1);

    //     document.getElementById("head1").style.top = "0";
    //   } else {
    //     document.getElementById("head1").style.top = "-50px";
    //   }
    //   prevScrollpos = currentScrollPos;
    // }




  }





}
