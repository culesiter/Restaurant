import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../share/services/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../../../share/services/contacService/Excel.service';
import { Subject } from 'rxjs';
declare var $: any;
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
  private currentyear = new Date().getFullYear();
  private currentmonth = new Date().getMonth() + 1;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private staff: StaffService, private formBuilder: FormBuilder, private excelService: ExcelService) { }

  ngOnInit() {
    this.form();
    this.getList(this.currentmonth);
    this.dtOptions = {
      pagingType: 'full_numbers',
      retrieve: true,
      paging: true,
      ordering: false,
      language: {
        processing: 'Procesando...',
        search: 'Tìm Kiếm:',
        lengthMenu: 'Hiển thị _MENU_ mục',
        info: 'Hiển thị từ _START_ đến _END_ mục trong _TOTAL_ mục',
        infoEmpty: 'Không có mục nào',
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "Không có mục nào",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: 'Đầu tiên',
          previous: 'Trở về',
          next: 'Kế tiếp',
          last: 'Cuối cùng'
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
  }

  exportAsXLSX(): void {
    const salary_arr = [];
    salary_arr.push(this.bangluong);
    this.excelService.exportAsExcelFile(salary_arr, 'Bang_luong_');
  }
  form() {
    this.serchform = this.formBuilder.group({
      thang: [this.currentmonth, [
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
            console.log(element2.thangtra, thang, element2.thangtra == thang);
            if (element2.thangtra == thang && element2._idnhanvien._id === element._id && element2.namtra == this.currentyear) {
              element['luong'] = 'datinh';
            }
          });
        });
        this.dtTrigger.next();
      });
    });
  }
  calc(item) {
    this.data = item;
    console.log(this.data);
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
      thangtra: this.serchform.value.thang || this.currentmonth,
      namtra: this.currentyear,
      cap: data._idcapnhanvien.cap,
      luongtheongay: data._idcapnhanvien.luongtheongay
    };
    this.staff.thembangluong(wrap).subscribe(response => {
      console.log(response);
      if (response.message === 'luu thanh cong') {
        $.notify('Lương đã được tính!', 'success');
        this.getList(this.serchform.value.thang || this.currentmonth);
        setTimeout(() => {
          $('#myModal').modal('hide');
        }, 150);
      }
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
