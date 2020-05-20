import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffService } from '../../../../share/services/staff.service';
import { Subject } from 'rxjs';
declare var $;
@Component({
  selector: 'app-stafff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  private formStatus = 'view';
  private listData: any[] = [];
  private eData: any = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  private allrank;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private staff: StaffService) { }
  ngOnInit() {
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
    this.taoForm();
    this.getList();
    this.getallrank();
  }
  getallrank() {
    this.staff.laydscapnv().subscribe(res => {
      this.allrank = res;
    });
  }
  formShow(a, data) {
    this.formStatus = a;
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required
      ]],
      matkhau: ['', [
        Validators.required
      ]],
      sdt: ['', [
      ]],
      _idcapnhanvien: ['', [
        Validators.required
      ]]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      email: ['', []],
      sdt: ['', [
      ]],
      _idcapnhanvien: ['', [
      ]]
    });
  }
  showdetail(data) {
    this.eData = data;
    this.frmSua = this.formBuilder.group({
      ten: [data.name, []],
      email: [data.email, []],
      sdt: [data.sdt, [
      ]],
      _idcapnhanvien: [data._idcapnhanvien._id, [
      ]]
    });
  }
  getList() {
    this.staff.laydanhsach().subscribe(res => {
      this.listData = res; console.log(res);
      this.dtTrigger.next();
    });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew() {
    this.staff.them(this.formAddNew.value).subscribe(res => {
      if (res.message === 'luu thanh cong') {
        const data = res;
        console.log(data.values._id);
        const uploaddata = new FormData();
        uploaddata.append('nhanvienimg', this.selectedFile);
        this.staff.upanhkh(data.values._id, uploaddata).subscribe(resq => {
          if (resq.message === 'thanh cong') {
            $.notify('Đã tạo một mục mới!', 'success');
            this.getList();
            setTimeout(() => {
              $('#addstaff').modal('hide');
            }, 150);
            this.formStatus = 'view';
          }
        });
      }
    });
  }
  edit() {
    if (confirm('Bạn muốn sửa?')) {
      this.staff.sua(this.eData._id, this.frmSua.value).subscribe(res => {
        if (res.message === 'thanh cong') {
          $.notify('Đã sửa một mục!', 'success');
          this.getList();
          setTimeout(() => {
            $('#detailstaff').modal('hide');
          }, 150);
          this.formStatus = 'view';
        } else {
          $.notify("Có lỗi xảy ra!", "error");
        }
      });
    }
  }
  delete(id) {
    if (confirm('Bạn muốn xóa?')) {
      this.staff.xoa(id).subscribe(res => {
        console.log(res);

        if (res.message === 'lichlam') {
          $.notify("Đã có lịch làm", "error");
        } else if (res.message === 'bangluong') {
          $.notify("Đã có bảng lương", "error");
        } else if (res.message === 'xoa thanh cong') {
          $.notify('Đã xóa!', 'success');
          this.getList();
          this.formStatus = 'view';
        }
      });
    }
  }
}
