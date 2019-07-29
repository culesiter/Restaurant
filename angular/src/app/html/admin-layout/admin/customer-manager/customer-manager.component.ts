import { Component, OnInit } from '@angular/core';
import { Icustomer } from '../../../../share/entities/icustomer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HumanService } from '../../../../share/services/human.service';
import { Subject } from 'rxjs';
declare var $;
@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.scss']
})
export class CustomerManagerComponent implements OnInit {
  private formStatus = 'view';
  private listData: Icustomer[] = [];
  private eData: Icustomer = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private human: HumanService) { }
  ngOnInit() {
    this.taoForm();
    this.getList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      retrieve: true,
      paging: true,
    };
  }
  formShow(a, data) {
    this.formStatus = a;
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{6,32$')
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9%-_]{4,32}@gmail.com$')
      ]],
      matkhau: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{6,32$')
      ]],
      thanhvien: ['', []],
      diem: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{8,32$')
      ]]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      email: ['', []],
      matkhau: ['', []],
      thanhvien: ['', []],
      diem: ['', []]
    });
  }
  getList() {
    this.human.laydanhsach().subscribe(res => { this.listData = res; this.dtTrigger.next(); });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew() {
    this.human.them(this.formAddNew.value).subscribe(res => {
      var data = res;
      const uploaddata = new FormData();
      uploaddata.append('khachhangimg', this.selectedFile);
      console.log(this.selectedFile,uploaddata);
      this.human.upanhkh(data.values._id, uploaddata).subscribe(resq =>{
        console.log(resq);
        if(resq){
          alert('thanh cong!');
          this.getList();
          this.formStatus = 'view';
        }
      })
    })
  }
  edit() {
    this.human.sua(this.eData._id, this.frmSua.value).subscribe(res => {
      if (res) {
        alert('ok');
        this.getList();
        this.formStatus = 'view';
      } else {
        alert('failed');
      }
    })
  }
  delete() {
    this.human.xoa(this.eData._id).subscribe(res => {
      this.getList();
      this.formStatus = 'view';
    });
  }
}
