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
private usertemp: Icustomer ={};
private usertempForid: Icustomer ={};
private frmSua: FormGroup;
private eData: Icustomer = {};
private tempCalendar: any[] = [
  {start: "2019-08-03",end: "2019-08-05T08:00:00.000Z",text: "test calendar.",color: "red"}
];
  constructor(private formBuilder: FormBuilder, private human: HumanService) { }

  events: any;

    eventSettings: MbscEventcalendarOptions = {
        theme: 'ios',
        display: 'inline',
        view: {
            calendar: { type: 'month' },
            eventList: { type: 'month', scrollable: true }
        }
    };

  ngOnInit() {
    this.usertempForid=JSON.parse(localStorage.getItem('user'));
    this.human.laythongtinkhachhangtheoid(this.usertempForid._id).subscribe(res =>{
      this.usertemp = res[0];
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
