import { Component, OnInit } from '@angular/core';
import { Iphong } from '../../../../share/entities/iphong';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhongserviceService } from '../../../../share/services/phongservice.service';
import { IloaiPhong } from '../../../../share/entities/iloai-phong';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.scss']
})
export class RoomManagerComponent implements OnInit {
  private formStatus = 'view';
  private lstType: IloaiPhong[] = [];
  private listData: Iphong[] = [];
  private eData: Iphong = {};
  private formAddNew1: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private phongserviceService: PhongserviceService) { }
  ngOnInit() {
    this.taoForm();
    this.getList();
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
  getListType() {
    this.phongserviceService.laydanhsachloaiphong().subscribe(res => {
      this.lstType = res;
    });
  }
  formShow(data) {
    this.eData = data;
    console.log(data)
    this.frmSua = this.formBuilder.group({
      ten: [data.ten, []],
      _idloai: [data._idloai, []],
      gia: [data.gia, []],
      tinhtrang: [1, []]
    });
  }
  taoForm() {
    this.formAddNew1 = this.formBuilder.group({
      ten: ['', [
        Validators.required
      ]],
      _idloai: ['', [
        Validators.required
      ]],
      gia: ['', [
        Validators.required
      ]],
      tinhtrang: [1, [
      ]]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      _idloai: ['', []],
      gia: ['', []],
      tinhtrang: ['', []]
    });
  }
  getList() {
    this.phongserviceService.laydanhsachphong().subscribe(res => {
      this.listData = res;
      this.dtTrigger.next();
    });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew() {
    this.phongserviceService.themphong(this.formAddNew1.value).subscribe(res => {
      if (res.message === 'luu thanh cong') {
        const data = res;
        console.log(data);
        const uploaddata = new FormData();
        uploaddata.append('phongimg', this.selectedFile);
        console.log(this.selectedFile);
        if (this.selectedFile) {
          this.phongserviceService.upanh(data.values._id, uploaddata).subscribe(resq => {
            if (resq.message === 'thanh cong') {
              $.notify('Đã tạo phòng mới', 'success');
              setTimeout(() => {
                $('#addroom').modal('hide');
              }, 150);
              this.getList();
              this.formStatus = 'view';
            } else {
              $.notify('Có lỗi xảy ra với hình', 'error');
            }
          });
        }
      } else if (res.message === 'phong da co') {
        $.notify('Trùng tên', 'error');
      }
    });
  }
  edit() {
    if (confirm('Bạn có muốn sửa?')) {
      this.phongserviceService.suaphong(this.eData._id, this.frmSua.value).subscribe(res => {
        if (res.message === 'thanh cong') {
          $.notify('Đã cập nhật', 'success');
          setTimeout(() => {
            $('#detailmd').modal('hide');
          }, 150);
          this.getList();
          this.formStatus = 'view';
        } else {
          $.notify('Có lỗi', 'error');
        }
      });
    }

  }
  delete(id) {
    if (confirm('Bạn muốn xóa?')) {
      this.phongserviceService.xoaphong(id).subscribe(res => {
        if (res.message === 'rang buoc') {
          $.notify('Hóa đơn đang chứa phòng trên', 'error');
        } else if (res.message === 'xoa thanh cong') {
          $.notify('Đã xóa', 'success');
          this.getList();
        }
      });
    }

  }
}
