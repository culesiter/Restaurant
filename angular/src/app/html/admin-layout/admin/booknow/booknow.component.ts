import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.scss']
})
export class BooknowComponent implements OnInit {
  private monAnChuaChon = [
    { name: 'Ếch núp lùm', value: '1', checked: true },
    { name: 'Cơm chiên cá mặn', value: '2', checked: false },
    { name: 'Vũ nữ chân dài', value: '3', checked: true }
  ];
  private monAnTrongThucDon = [];
  private formAddNew: FormGroup;
  constructor(private atp: AmazingTimePickerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.taoFormAddNew();
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  chonmon(a) {
    this.monAnTrongThucDon.push(a);
    this.monAnChuaChon.splice(a, 1);
  }
  xoaMon(a) {
    this.monAnChuaChon.push(a);
    this.monAnTrongThucDon.splice(a, 1);
  }
  taoFormAddNew() {
    this.formAddNew = this.formBuilder.group({
      kh: ['', []],
      phong: ['', []],
      ngay: ['', []],
      gio: ['', []]
    });
  }
  taoMoi() {
    console.log(this.formAddNew.value);
  }
  formClear() {
    this.formAddNew.reset();
  }
}
