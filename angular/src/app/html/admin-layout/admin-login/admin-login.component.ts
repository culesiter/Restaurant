import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HumanService } from '../../../share/services/human.service';
import { Router } from '@angular/router';
import { log } from 'util';
declare var $;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
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
        this.router.navigate(['/admin/dashboard']);
      } else{
        $.notify("Có lỗi xảy ra!", "error");
      }
    });

  }
}
