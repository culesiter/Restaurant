import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DishserviceService } from '../../../../share/services/dishservice.service';
import { iloaimon } from '../../../../share/entities/iloaimon';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-s-dish-type',
  templateUrl: './s-dish-type.component.html',
  styleUrls: ['./s-dish-type.component.scss']
})
export class SDishTypeComponent implements OnInit {

 
  private formStatus = 'view';
  private listLoaiMon: iloaimon[] = [];
  private eLoaiMon: iloaimon = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private styleExp = 'none';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder, private dishserviceService: DishserviceService, private router: Router) { }

  ngOnInit() {
    this.taoFormAddNew();
    this.getListType();
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
  taoFormAddNew() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', []],
      mota: ['', []]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      mota: ['', []]
    });
  }
  formShow(a, data) {
    this.formStatus = a;
    this.eLoaiMon = data;
    this.frmSua = this.formBuilder.group({
      ten: [data.ten, []],
      mota: [data.mota, []]
    });
  }
  XoaForm(a: FormGroup) {
    a.reset();
  }
  getListType() {
    this.dishserviceService.laydsloaimon().subscribe(res => {
      this.listLoaiMon = res;
      this.dtTrigger.next();
    });
  }
  taoMoi() {
    this.dishserviceService.themloaimon(this.formAddNew.value).subscribe(res => {
      if (res.message === 'luu thanh cong') {
        $.notify('Đã tạo một món ăn mới!', 'success');
        this.formStatus = 'view';
        this.getListType();
        this.formStatus = 'view';
        setTimeout(() => {
          $('#add-type').modal('hide');
        }, 150);
      } else {
        $.notify('Thử lại với tên khác!', 'error');
      }
    });
  }
  sua() {
    this.dishserviceService.sualoaimon(this.eLoaiMon._id, this.frmSua.value).subscribe(res => {
      console.log(res);
      if (res) {
        $.notify('Đã sửa một mục!', 'success');
        this.getListType();
        this.formStatus = 'view';
      } else {
        $.notify("Có lỗi xảy ra!", "error");
      }
    })
  }
  back() {
    this.getListType();
    this.formStatus = 'view';
  }
  XoaMon(id) {
    console.log(id);
    if (confirm('Bạn muốn xóa?')) {
      this.dishserviceService.xoaloaimon(id).subscribe(res => {
        if (res.message === 'xoa thanh cong') {
          $.notify('Đã xóa một mục!', 'success');
        } else if (res.message === 'rang buoc') {
          $.notify('Có món ăn chứa loại trên', 'error');
        }
        this.getListType();
        this.formStatus = 'view';
      });
    }
  }
}
