import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DishserviceService } from '../../../../share/services/dishservice.service';
import { iloaimon } from '../../../../share/entities/iloaimon';

@Component({
  selector: 'app-loaimonan',
  templateUrl: './loaimonan.component.html',
  styleUrls: ['./loaimonan.component.scss']
})
export class LoaimonanComponent implements OnInit {

  private formStatus = 'view';
  private listLoaiMon  : iloaimon[] =[];
  private eLoaiMon:iloaimon = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private styleExp = 'none';
  constructor(private formBuilder: FormBuilder, private dishserviceService: DishserviceService) { }

  ngOnInit() {
    this.taoFormAddNew();
    this.getListType();
  }
  taoFormAddNew() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', []],
      descrip: ['', []]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['haha', []],
      descrip: ['', []]
    });
  }
  formShow(a,data) {
    this.formStatus = a;
    this.eLoaiMon = data;
  }
  XoaForm(a: FormGroup) {
    a.reset();
  }
  getListType(){
    this.dishserviceService.laydsloaimon().subscribe(res => this.listLoaiMon = res)
  }
  taoMoi() {
    this.dishserviceService.themloaimon(this.formAddNew.value).subscribe(res => {
      if(res){
        alert('Them thanh cong!');
        this.getListType();
        this.formStatus = 'view';
      }
    })
  }
  sua() {
    this.dishserviceService.sualoaimon(this.eLoaiMon._id, this.frmSua.value).subscribe(res => {
      console.log(res);
      if(res){
        alert('ok');
        this.getListType();
        this.formStatus = 'view';
      } else {
        alert ('failed');
      }
    })
  }
  XoaMon(){
    this.dishserviceService.xoaloaimon(this.eLoaiMon._id).subscribe(res => {
      this.getListType();
      this.formStatus = 'view';
    });
  }
}
