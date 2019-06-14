import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../share/services/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  private listData: any[];
  private serchform: FormGroup;
  private data: any;
  private tongluong: number;
  private mounthde = '1';
  private bangluong: any[];
  constructor(private staff: StaffService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form();
    this.getList('1');
  }
  form() {
    this.serchform = this.formBuilder.group({
      thang: ['', [
      ]]
    });
  }
  getList(thang) {
    this.staff.laydanhsach().subscribe(res => {
      this.listData = res;
      this.staff.laydanhsachdatinh().subscribe(response => {
        this.listData.forEach(element => {
          element['luong'] = 'chuatinh';
          response.forEach(element2 => {
            if (element2.thangtra === thang && element2._idnhanvien._id === element._id) {
              element['luong'] = 'datinh';
            }
          });
        });
      });
      console.log(this.listData);
    });
  }
  calc(item) {
    this.data = item;
  }
  calc2(ngay, luong) {
    console.log(ngay * luong);
    this.tongluong = ngay * luong;
  }
  calc3(data, ngay, tongluong) {
    const wrap = {
      _idnhanvien: data._id,
      songaylam: ngay,
      tongluong: tongluong,
      thangtra: '1'
    };
    this.staff.thembangluong(wrap).subscribe(response => {
      console.log(response);
      this.getList(this.mounthde);
    });
  }
  search() {
    console.log(this.serchform.value);
    this.mounthde = this.serchform.value.thang;
    this.getList(this.serchform.value.thang);
  }
  detail(item) {
    this.staff.laybangluongtheoid(item._id).subscribe(res => {
      res.forEach(element => {
        if (element.thangtra === this.mounthde) {
          this.bangluong = element;
        }
      });
    });
  }
}
