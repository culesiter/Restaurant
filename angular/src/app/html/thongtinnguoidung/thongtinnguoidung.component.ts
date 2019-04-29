import { Component, OnInit } from '@angular/core';
import { Icustomer } from '../../share/entities/icustomer';
@Component({
  selector: 'app-thongtinnguoidung',
  templateUrl: './thongtinnguoidung.component.html',
  styleUrls: ['./thongtinnguoidung.component.scss']
})
export class ThongtinnguoidungComponent implements OnInit {
private usertemp: Icustomer ={};
  constructor() { }
  ngOnInit() {
    this.usertemp=JSON.parse(localStorage.getItem('user'));
  }

}
