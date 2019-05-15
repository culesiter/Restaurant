import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffService } from '../../../../share/services/staff.service';
@Component({
  selector: 'app-stafff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  private formStatus = 'view';
  private listData: any[] = [];
  private eData: any = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  constructor(private formBuilder: FormBuilder,
    private staff: StaffService) { }
  ngOnInit() {
    this.taoForm();
    this.getList();
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
    this.staff.laydanhsach().subscribe(res => { this.listData = res; console.log(res);
     });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew() {
    this.staff.them(this.formAddNew.value).subscribe(res => {
      var data = res;
      console.log(data.values._id);
      const uploaddata = new FormData();
      uploaddata.append('khachhangimg', this.selectedFile);
      console.log(this.selectedFile,uploaddata);
      this.staff.upanhkh(data.values._id, uploaddata).subscribe(resq =>{
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
    this.staff.sua(this.eData._id, this.frmSua.value).subscribe(res => {
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
    this.staff.xoa(this.eData._id).subscribe(res => {
      this.getList();
      this.formStatus = 'view';
    });
  }
}
