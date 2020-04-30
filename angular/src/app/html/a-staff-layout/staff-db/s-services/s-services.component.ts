import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idichvu } from '../../../../share/entities/idichvu';
import { DichvuService } from '../../../../share/services/dichvu.service';
declare var $;
@Component({
  selector: 'app-s-services',
  templateUrl: './s-services.component.html',
  styleUrls: ['./s-services.component.scss']
})
export class SServicesComponent implements OnInit {

  private formStatus = 'view';
  private  listData: Idichvu[] = [];
  private eData: Idichvu = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  constructor(private formBuilder: FormBuilder,
              private dvservices: DichvuService) { }
  ngOnInit() {
    this.taoForm();
    this.getList();
  }
  formShow(data) {
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      succhua: ['', []],
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      succhua: ['', []],
    });
  }
  getList(){
    this.dvservices.laydanhsachDV().subscribe(res =>{ this.listData = res});
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew(){
    this.dvservices.themDV(this.formAddNew.value).subscribe(res => {
      var data = res;
      const uploaddata = new FormData();
      uploaddata.append('dichvuimg', this.selectedFile);
      console.log(uploaddata);
      this.dvservices.upanh(data.values._id, uploaddata).subscribe(resq =>{
        console.log(resq);
        if(resq){
          $.notify('Đã tạo một mục mới!', 'success');
          this.getList();
          this.formStatus = 'view';
        }
      })
    
    })
  }
  edit(){
    this.dvservices.suaDV(this.eData._id, this.frmSua.value).subscribe(res => {
      if(res){
        var data = res;
      const uploaddata = new FormData();
      uploaddata.append('dichvuimg', this.selectedFile);
      console.log(uploaddata);
      this.dvservices.upanh(this.eData._id, uploaddata).subscribe(resq =>{
        console.log(resq);
        if(resq){
         $.notify('Đã sửa một mục!', 'success');
          this.getList();
          this.formStatus = 'view';
        }
      })
      } else {
        $.notify("Có lỗi xảy ra!", "error");
      }
    })
  }
  delete(){
    this.dvservices.xoaDV(this.eData._id).subscribe(res => {
      this.getList();
      this.formStatus = 'view';
    });
  }
}