import { Component, OnInit } from '@angular/core';
import { Icustomer } from '../../share/entities/icustomer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HumanService } from '../../share/services/human.service';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
declare var $;
@Component({
  selector: 'app-thongtinnguoidung',
  templateUrl: './thongtinnguoidung.component.html',
  styleUrls: ['./thongtinnguoidung.component.scss']
})
export class ThongtinnguoidungComponent implements OnInit {
private usertemp: any ={};
private usertempForid: Icustomer ={};
private frmSua: FormGroup;
private dtl : number;
private eData: Icustomer = {};
  constructor(private formBuilder: FormBuilder, private human: HumanService) { }
  ngOnInit() {
    this.usertempForid=JSON.parse(localStorage.getItem('user'));
    this.human.laythongtinkhachhangtheoid(this.usertempForid._id).subscribe(res =>{
      this.usertemp = res[0];
      console.log(this.usertemp);
      if(this.usertemp.diem === null){
        this.dtl = 0;
      } else{
        this.dtl = this.usertemp.diem;
      }
    })
    this.taoForm();
  }
  taoForm() {
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      email: ['', []],
      matkhau: ['', []],
      diachi: ['', []],
    });
  }
  edit() {
    this.human.sua(this.usertemp._id, this.frmSua.value).subscribe(res => {
      if (res) {
        this.human.laythongtinkhachhangtheoid(this.usertemp._id).subscribe(responsive =>{
          this.usertemp = responsive[0];
        })
        $('#editmd').modal('toggle'); 
        $.notify("Đã cập nhật", "success");
      } else {
        alert('failed');
      }
    });
  }




}
