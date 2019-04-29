import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   $('.carousel').addClass('flickity-enabled is-draggable flickity-viewport')
    this.doiTaiTrang();
  }
  doiTaiTrang() {
    $(function () {
      $(".loader1").fadeOut(500, function () {
        $(".conten").fadeIn(10000);
      })
    })
  }
}
