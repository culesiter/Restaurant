import { Component, OnInit } from '@angular/core';
import { Icustomer } from '../../share/entities/icustomer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HumanService } from '../../share/services/human.service';
declare var $;
@Component({
  selector: 'app-thongtinnguoidung',
  templateUrl: './thongtinnguoidung.component.html',
  styleUrls: ['./thongtinnguoidung.component.scss']
})
export class ThongtinnguoidungComponent implements OnInit {
private usertemp: Icustomer ={};
private usertempForid: Icustomer ={};
private frmSua: FormGroup;
private eData: Icustomer = {};
  constructor(private formBuilder: FormBuilder, private human: HumanService) { }
  ngOnInit() {
    this.usertempForid=JSON.parse(localStorage.getItem('user'));
    this.human.laythongtinkhachhangtheoid(this.usertempForid._id).subscribe(res =>{
      this.usertemp = res;
      console.log(this.usertemp);
    })
    this.taoForm();
  }
  taoForm() {
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      email: ['', []],
      matkhau: ['', []],
    });
  }
  edit() {
    this.human.sua(this.usertemp._id, this.frmSua.value).subscribe(res => {
      if (res) {
        this.human.laythongtinkhachhangtheoid(this.usertemp._id).subscribe(responsive =>{
          this.usertemp = responsive;
        })
        $('#editmd').modal('toggle'); 
        $.notify("Đã cập nhật", "success");
      } else {
        alert('failed');
      }
    });
  }
}
