import { Component, OnInit } from '@angular/core';
import { Iphong } from '../../../../share/entities/iphong';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhongserviceService } from '../../../../share/services/phongservice.service';
import { IloaiPhong } from '../../../../share/entities/iloai-phong';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-s-room',
  templateUrl: './s-room.component.html',
  styleUrls: ['./s-room.component.scss']
})
export class SRoomComponent implements OnInit {

  private formStatus = 'view';
  private lstType: IloaiPhong[] = [];
  private listData: Iphong[] = [];
  private eData: Iphong = {};
  private formAddNew: FormGroup;
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
    this.phongserviceService.laydanhsachloaiphong().subscribe(res => { this.lstType = res });
  }
  formShow(data) {
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', []],
      _idloai: ['', []],
      gia: ['', []],
      succhua: ['', []],
      tinhtrang: ['', []]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      _idloai: ['', []],
      gia: ['', []],
      succhua: ['', []],
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
    this.phongserviceService.themphong(this.formAddNew.value).subscribe(res => {
      var data = res;
      console.log(data);
      const uploaddata = new FormData();
      uploaddata.append('phongimg', this.selectedFile);
      this.phongserviceService.upanh(data.values._id, uploaddata).subscribe(resq => {
        if (resq.message === 'luu thanh cong') {
          $.notify('Đã tạo phòng mới');
          setTimeout(() => {
            $('#addroom').modal('hide');
          }, 150);
          this.getList();
          this.formStatus = 'view';
        } else {
          $.notify('Có lỗi xảy ra');
        }
      });
    });
  }
  edit() {
    this.phongserviceService.suaphong(this.eData._id, this.frmSua.value).subscribe(res => {
      if (res) {
        $.notify('Đã sửa một mục!', 'success');
        this.getList();
        this.formStatus = 'view';
      } else {
        $.notify("Có lỗi xảy ra!", "error");
      }
    })
  }
  delete() {
    this.phongserviceService.xoaphong(this.eData._id).subscribe(res => {
      this.getList();
      this.formStatus = 'view';
    });
  }
}
