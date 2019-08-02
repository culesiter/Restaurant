import { Component, OnInit } from '@angular/core';
import { Icustomer } from '../../../../share/entities/icustomer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HumanService } from '../../../../share/services/human.service';
import { Subject } from 'rxjs';
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
    this.getList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
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
      thanhvien: ['', []],
      diem: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{8,32$')
      ]]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      email: ['', []],
      matkhau: ['', []],
      thanhvien: ['', []],
      diem: ['', []]
    });
  }
  getList() {
    this.human.laydanhsach().subscribe(res => { this.listData = res; this.dtTrigger.next(); });
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
            this.getList();
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
    this.human.sua(this.eData._id, this.frmSua.value).subscribe(res => {
      if (res) {
        $.notify("Đã sửa 1 mục", "success");
        this.getList();
        this.formStatus = 'view';
      } else {
        alert('failed');
      }
    });
  }
  delete() {
    this.human.xoa(this.eData._id).subscribe(res => {
      this.getList();
      this.formStatus = 'view';
    });
  }
}
