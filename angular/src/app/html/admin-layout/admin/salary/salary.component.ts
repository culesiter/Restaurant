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
  constructor(private staff: StaffService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form();
    this.getList();
  }
  form() {
    this.serchform = this.formBuilder.group({
      thang: ['', [
      ]]
    });
  }
  getList() {
    this.staff.laydanhsach().subscribe(res => {
      this.listData = res;
      this.staff.laydanhsachdatinh().subscribe(response => {
        this.listData.forEach(element => {
          element['luong'] = 'chuatinh';
          response.forEach(element2 => {
            if (element.thangtra === element2.thangtra) {
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
  search() {
    console.log(this.serchform.value);
  }
}
