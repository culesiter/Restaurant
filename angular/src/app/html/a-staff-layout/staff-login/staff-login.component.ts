import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HumanService } from '../../../share/services/human.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss']
})
export class StaffLoginComponent implements OnInit {
  private frmDangNhap: FormGroup;
  constructor(private formBuilder: FormBuilder, private human: HumanService, private router: Router) { }

  ngOnInit() {
    this.taoFormDangNhap();
  }
  taoFormDangNhap() {
    this.frmDangNhap = this.formBuilder.group({
      email: ['', []],
      matkhau: ['', []]
    });
  }
  dangNhap() {
    console.log(1);
    this.human.login(this.frmDangNhap.value.email, this.frmDangNhap.value.matkhau).subscribe(response => {
      console.log(response);
      if (response.message === 'dang nhap thanh cong') {
        $.notify('Đăng nhập thành công!', 'success');
        const nv = JSON.stringify(response);
        localStorage.setItem('staff', nv);
        sessionStorage.setItem('staff', nv);
        this.router.navigate(['/staff/dashboard']);
      } else{
        $.notify("Có lỗi xảy ra!", "error");
      }
    });

  }

}
