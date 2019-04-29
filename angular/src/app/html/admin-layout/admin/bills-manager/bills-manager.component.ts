import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ihoadon } from '../../../../share/entities/ihoadon';
import { HoadonService } from '../../../../share/services/hoadon.service';

@Component({
  selector: 'app-bills-manager',
  templateUrl: './bills-manager.component.html',
  styleUrls: ['./bills-manager.component.scss']
})
export class BillsManagerComponent implements OnInit {
  private xem = true;
  private lstHoadon: Ihoadon[] = [];
  ehoadon: Ihoadon ={};
  constructor(private router: Router, private hoadonS: HoadonService) { }
  ngOnInit() {
    this.laydsHoadon();
  }
  openDetail(data) {
    this.xem = !this.xem;
    this.ehoadon = data;
  }
  laydsHoadon() {
    this.hoadonS.laydanhsach().subscribe(res => this.lstHoadon = res);
  }
}
