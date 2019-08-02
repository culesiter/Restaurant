import { Component, OnInit } from '@angular/core';
import { Iphong } from '../../../../share/entities/iphong';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhongserviceService } from '../../../../share/services/phongservice.service';
import { IloaiPhong } from '../../../../share/entities/iloai-phong';

@Component({
  selector: 'app-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.scss']
})
export class RoomManagerComponent implements OnInit {
  private formStatus = 'view';
  private lstType: IloaiPhong[] = [];
  private  listData: Iphong[] = [];
  private eData: Iphong = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  constructor(private formBuilder: FormBuilder,
              private phongserviceService: PhongserviceService) { }
  ngOnInit() {
    this.taoForm();
    this.getList();
    this.getListType();
  }
  getListType(){
    this.phongserviceService.laydanhsachloaiphong().subscribe(res =>{ this.lstType = res});
  }
  formShow(data) {
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', []],
      _idloai: ['', []],
      gia: ['', []],
      succhua: ['', []],
      tinhtrang: ['', []]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      _idloai: ['', []],
      gia: ['', []],
      succhua: ['', []],
      tinhtrang: ['', []]
    });
  }
  getList(){
    this.phongserviceService.laydanhsachphong().subscribe(res =>{ this.listData = res});
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew(){
    this.phongserviceService.themphong(this.formAddNew.value).subscribe(res => {
      var data = res;
      console.log(data);
      const uploaddata = new FormData();
      uploaddata.append('phongimg', this.selectedFile);
      this.phongserviceService.upanh(data.values._id, uploaddata).subscribe(resq =>{
        if(resq){
          alert('thanh cong!');
          this.getList();
          this.formStatus = 'view';
        }
      })
    })
  }
  edit(){
    this.phongserviceService.suaphong(this.eData._id, this.frmSua.value).subscribe(res => {
      if(res){
        alert('ok');
        this.getList();
        this.formStatus = 'view';
      } else {
        alert ('failed');
      }
    })
  }
  delete(){
    this.phongserviceService.xoaphong(this.eData._id).subscribe(res => {
      this.getList();
      this.formStatus = 'view';
    });
  }
}
