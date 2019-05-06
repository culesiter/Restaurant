import { Icustomer } from './../../share/entities/icustomer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../share/services/login.service';
import { HumanService } from '../../share/services/human.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private frmDangKy: FormGroup;
  private khachhang: Icustomer = {};
  private user: any = [];
  constructor(private formbuilder: FormBuilder, private router: Router, private login: LoginService, private customer: HumanService) { }

  ngOnInit() {
    this.taoForm();
  }
  luuForm() {
    console.log(JSON.stringify(this.frmDangKy.value));
    this.user = { ten: this.frmDangKy.value.ten,
       email: this.frmDangKy.value.email,
        sdt: this.frmDangKy.value.sdt,
         matkhau: this.frmDangKy.value.matkhau,
        thanhvien: true };
    this.customer.them1(this.user).subscribe(response => {
      console.log(response);
      if (response.message === 'tao thanh cong') {
        this.login.login(this.frmDangKy.value.email, this.frmDangKy.value.matkhau).subscribe(res => {
          console.log(res);
          if (res.message === 'dang nhap thanh cong') {
            alert('dang nhap thanh cong');
            const user = JSON.stringify(res);
            localStorage.setItem('user', user);
            this.khachhang = JSON.parse(localStorage.getItem('user'));
            this.router.navigate(['/home']);
          }
        });
      } else if (response.message === 'email da co') {
        alert('email da ton tai');
      }
    });
  }
  taoForm() {
    this.frmDangKy = this.formbuilder.group({
      ten: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9%-_]{4,32}@gmail.com$')
      ]],
      sdt: ['', [
        Validators.required,
        Validators.pattern('^(0)[0-9]{9,10}$')
      ]],
      matkhau: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{6,25}$')
      ]]
    });
  }

}
