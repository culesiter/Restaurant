import { Ithucdoninter } from './../../../../share/entities/ithucdoninter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idish } from '../../../../share/entities/idish';
import { DishserviceService } from '../../../../share/services/dishservice.service';
import { ThucdonserviceService } from '../../../../share/services/thucdonservice.service';
import { Ithucdon } from '../../../../share/entities/ithucdon';
import { Ithucdonmonan } from '../../../../share/entities/ithucdonmonan';
import { log } from 'util';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {
  private formStatus = 'view';
  private ss = '';
  private menuTemp: Ithucdon = {};
  private listmon: Idish[] = [];
  private listThucdon: Ithucdon[] = [];
  private lstmontheothucdon: any[] = [];
  private formAddNewMenu: FormGroup;
  private tdmnTemp: Ithucdonmonan ={};
  private countTemp: number = 0;
  private del_id: any;
  private styletemp = {};
  constructor(private formBuilder: FormBuilder,
    private dishS: DishserviceService, private menuS: ThucdonserviceService) { }
  ngOnInit() {
    this.getlistthucdon();
    this.getdsmon();
    this.taoForm();
  }

  back(){
    this.getlistthucdon();
    this.formStatus = 'view';
  }
  taoForm() {
    this.formAddNewMenu = this.formBuilder.group({
      ten: ['', []],
      khuyenmai: ['', []]
    });
  }
  laysl(vl){
    this.countTemp=vl.target.value;
  }
  formShow(a, id) {
    this.formStatus = a;
    this.del_id = id;
    this.menuS.getmonantheoIdthucdon(id).subscribe(res => {
      this.lstmontheothucdon = res;
    });
  }
  delete_menu(){
    var mconfirm = confirm('Bạn có muốn xóa thực đơn này?');
    if(mconfirm == true){
      this.menuS.xoathucdon(this.del_id).subscribe(res => {
        alert('Xóa thành công!');
        this.getlistthucdon();
        this.formStatus = 'view';
      })
    }
  }
  getlistthucdon() {
    this.menuS.laydstd().subscribe(res => this.listThucdon = res);
  }
  getdsmon() {
    this.dishS.laydanhsachmonan().subscribe(res => this.listmon = res);
  }
  addNew() {
    // this.menuTemp = this.formAddNewMenu.value;
    this.menuS.taothucdon(this.formAddNewMenu.value).subscribe(res => {
      this.menuTemp._id = res.values._id;
      console.log(res.values._id);
      alert('Tạo thực đơn thành công! Chọn món và số lượng vào thực đơn vừa tạo!');
      this.getlistthucdon();
      this.formStatus = 'addmon';
    })
  }
  themmonanhd(id){
    this.tdmnTemp._idmonan = id;
    this.tdmnTemp.soluong = this.countTemp;
    this.tdmnTemp._idthucdon = this.menuTemp._id;
    console.log(this.tdmnTemp);
    this.menuS.taothucdonmonan(this.tdmnTemp).subscribe(res =>{
      if(res){
        this.styletemp ='color: #4caf50 !important';
      }
    });
  }
  xoatd(id){
    this.menuS.xoaThucDonMonAn(id).subscribe(res=>{
      this.menuS.xoathucdon(id).subscribe(res=>{
        alert('xoa thanh cong!');
       this.getlistthucdon();
      })
    })
  }
}
