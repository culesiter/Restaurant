import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ihoadon } from '../../../../share/entities/ihoadon';
import { HoadonService } from '../../../../share/services/hoadon.service';
// import { ExcelService } from '../../../../share/services/contacService/Excel.service';
@Component({
  selector: 'app-bills-manager',
  templateUrl: './bills-manager.component.html',
  styleUrls: ['./bills-manager.component.scss']
})
export class BillsManagerComponent implements OnInit {
  private xem = true;
  private lstHoadon: Ihoadon[] = [];
  ehoadon: Ihoadon ={};
  private eCthd: any[] = [];
  constructor(private router: Router, private hoadonS: HoadonService) { }
  ngOnInit() {
    this.laydsHoadon();
  }
//   exportAsXLSX():void {
//     this.excelService.exportAsExcelFile(this.lstHoadon, 'sample');
//  }
  openDetail(data) {
    this.xem = !this.xem;
    this.ehoadon = data;
    console.log(data);
    this.laycthd(data._id);
    console.log(this.eCthd);
  }
  laycthd(id){
    this.hoadonS.getCTHD(id).subscribe(res => {
      if(res){
        this.eCthd = res
        console.log(res);
        ;
      }
    });
  }
  laydsHoadon() {
    this.hoadonS.laydanhsach().subscribe(res => this.lstHoadon = res);
  }
  deleteBill(){
    var check = confirm('Bạn có chắc chắn muốn xóa?');
    if(check==true){
      this.hoadonS.xoa(this.ehoadon._id).subscribe(res =>{
        alert('Xóa thành công!');
        this.laydsHoadon();
        this.xem= true;
      })
    }
  }
}
