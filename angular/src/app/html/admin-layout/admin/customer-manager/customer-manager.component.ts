import { Component, OnInit, ViewChild } from '@angular/core';
import { Icustomer } from '../../../../share/entities/icustomer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HumanService } from '../../../../share/services/human.service';
import { Subject } from 'rxjs';
import { Identifiers } from '@angular/compiler';
import { DataTableDirective } from 'angular-datatables';
declare var $;
@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.scss']
})
export class CustomerManagerComponent implements OnInit {
  private formStatus = 'view';
  private listData: Icustomer[] = [];
  private eData: Icustomer = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private human: HumanService) { }
  ngOnInit() {
    this.taoForm();
    this.getList(false);
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
  
  formShow(a, data) {
    this.formStatus = a;
  }
  openDetailInModal(data) {
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{6,32$')
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9%-_]{4,32}@gmail.com$')
      ]],
      matkhau: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{6,32$')
      ]],
      diachi: ['', [
        Validators.required
      ]],
      thanhvien: [true, []],
      diem: [0, [
        Validators.required,
        Validators.pattern('^[0-9]{8,32$')
      ]]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      email: ['', []],
      thanhvien: ['', []],
      diachi: ['', []],
      diem: ['', []]
    });
  }
  getList(dk) {
    this.listData = [];
    console.log(dk);
    this.human.laydanhsach().subscribe(res => {
      if (!dk) {
        this.listData = res;
      } else if (dk == 2) {
        console.log(dk);
        res.forEach(element => {
          if (element.thanhvien === false) {
            console.log(dk, element);
            this.listData.push(element);
          }
        });
      } else if (dk == 1) {
        res.forEach(element => {
          if (element.thanhvien === true) {
            this.listData.push(element);
          }
        });
      }
      this.dtTrigger.next();
    });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew() {
    this.human.them(this.formAddNew.value).subscribe(res => {
      if (res.message === 'tao thanh cong') {
        const data = res;
        const uploaddata = new FormData();
        uploaddata.append('khachhangimg', this.selectedFile);
        this.human.upanhkh(data.values._id, uploaddata).subscribe(resq => {
          if (resq.message === 'thanh cong') {
            $.notify('Đã tạo một khách hàng mới!', 'success');
            this.getList(false);
            this.formStatus = 'view';
            setTimeout(() => {
              $('#addc').modal('hide');
            }, 150);
          } else {
            $.notify('Gặp lỗi khi với hình của khách hàng', 'error');
          }
        });
      } else {
        $.notify('Trùng email', 'error');
      }
    });
  }
  edit() {
    if (confirm('Bạn muốn sửa?')) {
      this.human.sua(this.eData._id, this.frmSua.value).subscribe(res => {
        if (res.message === 'thanh cong') {
          $.notify("Đã sửa 1 mục", "success");
          this.getList(false);
          setTimeout(() => {
            $('#cusdetail').modal('hide');
          }, 150);
          this.formStatus = 'view';
        } else {
          $.notify("Có lỗi xảy ra!", "error");
        }
      });
    }
  }
  delete(id) {
    console.log(id);
    if (confirm('Bạn muốn xóa?')) {
      this.human.xoa(id).subscribe(res => {
        if (res.message === 'rang buoc') {
          $.notify('Có hóa đơn chứa người trên', 'error');
        } else if (res.message = 'xoa thanh cong') {
          $.notify('Đã xóa một mục!', 'success');
          this.getList(false);
        }
      });
    }
  }
}
