import { Component, OnInit } from '@angular/core';
import { Idish } from '../../../../share/entities/idish';
import { DishserviceService } from '../../../../share/services/dishservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iloaimon } from '../../../../share/entities/iloaimon';
import { log } from 'util';
declare var $: any;
@Component({
  selector: 'app-dish-manager',
  templateUrl: './dish-manager.component.html',
  styleUrls: ['./dish-manager.component.scss']
})
export class DishManagerComponent implements OnInit {
  private formStatus = 'view';
  private newDish: Idish = {};
  private editDish: Idish = {};
  private listDish: Idish[]=[];
  private lstType: iloaimon[]=[];
  private formAdd: FormGroup;
  private formEdit: FormGroup;
  private styleExp = 'none';
  private selectedFile: any;
  constructor(private dishserviceService: DishserviceService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.taoForm();
    this.getAllDish();
    this.getListType();
  }
  getListType(){
    this.dishserviceService.laydsloaimon().subscribe(res=> this.lstType = res);
  }
  taoForm() {
    this.formAdd = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      _idloai: ['', []],
      khuyenmai: ['', []],
    });
    this.formEdit = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      _idloai: ['', []],
      loai: ['', []],
      khuyenmai: ['', []],
    })
  }
  taoMon() {
    console.log(this.formAdd.value);
  }
  formShow(a,data) {
    this.formStatus = a;
    this.editDish = data;
  }
  detailview(data){
    this.editDish = data;
  }
  xoaForm() {
    this.formAdd.reset();
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  createNewDish() {
    this.newDish = this.formAdd.value;
    this.dishserviceService.themMonaAn(this.newDish).subscribe(res => {
      var data = res;
      const uploaddata = new FormData();
      uploaddata.append('monanimg', this.selectedFile);
      console.log(uploaddata);
      this.dishserviceService.upanh(data.values._id, uploaddata).subscribe(resq =>{
        if(resq){
          $.notify("Đã thêm 1 mục", "success");
          this.getAllDish();
          this.formStatus = 'view';
        }
      })
    });
  }
  getAllDish(){
    this.dishserviceService.laydanhsachmonan().subscribe(res=>{
      if(res){
        this.listDish = res;
      } else{
        console.log('Err');
      }
    })
  }
  deleteDish(id) {
    if(confirm('Bạn có muốn xóa món ăn này?')){
      this.dishserviceService.xoaMonAn(id).subscribe(res =>{
        console.log(res);
        if(res){
          $.notify("Đã xóa 1 mục", "success");
          this.getAllDish();
          this.formStatus = 'view';
        } else{
          alert('err');
        }
      })
    }
  }
  editExistDish() {
    const id = this.editDish._id;
    this.dishserviceService.suaMonAn(id, this.formEdit.value).subscribe(res => {
      if(res){
        var data = res;
      const uploaddata = new FormData();
      uploaddata.append('monanimg', this.selectedFile);
      console.log(uploaddata);
      this.dishserviceService.upanh(id, uploaddata).subscribe(resq =>{
        if(resq){
          alert('thanh cong!');
          this.getAllDish();
          this.formStatus = 'view';
        }
      })
      }else{
        alert('failed');
      }
    })
  }
  xoaAnhluon() {
    $.notify("Đã xóa 1 ảnh", "success");
  }
  mouseEnterDelete() {
    this.styleExp = 'block';
  }
  mouseLeaveDelete() {
    this.styleExp = 'none';
  }
}
