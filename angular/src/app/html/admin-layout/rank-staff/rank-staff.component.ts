import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../share/services/staff.service';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-rank-staff',
  templateUrl: './rank-staff.component.html',
  styleUrls: ['./rank-staff.component.scss']
})
export class RankStaffComponent implements OnInit {
  private listcb;
  private formAddNew: FormGroup;
  constructor(private formBuilder: FormBuilder, private staff: StaffService) { }

  ngOnInit() {
    this.taoFormAddNew();
    this.laydschucvu();
  }
  taoFormAddNew() {
    this.formAddNew = this.formBuilder.group({
      cap: ['', []],
      luongtheongay: ['', []]
    });
  }
  laydschucvu() {
    this.staff.laydscapnv().subscribe(res => {
      console.log(res);
      this.listcb = res;
    });
  }
  xoacbnv(id) {
    if (confirm('Bạn có muốn xóa?')) {
      this.staff.xoacbnv(id).subscribe(res => {
        console.log(res);
        if (res.message === 'xoa thanh cong') {
          $.notify('Xóa Thành Công', 'success');
          this.laydschucvu();
        }
      });
    }
  }
  taoMoi() {
    this.staff.themcbnv(this.formAddNew.value).subscribe(res => {
      console.log(res);
      if (res.message === 'luu thanh cong') {
        $.notify('Tạo Thành Công', 'success');
        setTimeout(() => {
          $('#add').modal('hide');
        }, 250);
        this.laydschucvu();
      }
    });
  }

}
