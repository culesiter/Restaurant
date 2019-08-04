import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../../share/services/DataTransfer/data-transfer.service';
import { StaffService } from '../../../share/services/staff.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-staff-db',
  templateUrl: './staff-db.component.html',
  styleUrls: ['./staff-db.component.scss']
})
export class StaffDbComponent implements OnInit {

  private headtittle: string;
  private user;
  constructor(private dataTransferService: DataTransferService, private staff: StaffService, private router: Router) { }

  ngOnInit() {
    this.dataTransferService.getTittle().subscribe(res => this.headtittle = res);
    const vl = JSON.parse(localStorage.getItem('staff'));
    if (vl) {
      this.laythongtinnhanvientheoid(vl._id);
    }
  }
  laythongtinnhanvientheoid(id) {
    this.staff.laynhanvientheoid(id).subscribe(res => {
      this.user = res[0];
        console.log(this.user);
    });
  }
  dangxuat() {
    localStorage.removeItem('staff');
    $.notify('Đăng xuất thành công!');
    this.router.navigate(['/staff/staff_login']);
  }
}
