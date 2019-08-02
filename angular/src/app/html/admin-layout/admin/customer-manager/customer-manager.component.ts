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
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
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
    this.human.laydanhsach().subscribe(res => { console.log(res); this.listData = res; this.dtTrigger.next(); });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  addNew() {
    this.human.them(this.formAddNew.value).subscribe(res => {
      if (res.message === 'tao thanh cong') {
        const data = res;
        const uploaddata = new FormData();
        uploaddata.append('khachhangimg', this.selectedFile);
        console.log(this.selectedFile, uploaddata);
        this.human.upanhkh(data.values._id, uploaddata).subscribe(resq => {
          console.log(resq);
          if (resq) {
            alert('thanh cong!');
            this.getList();
            this.formStatus = 'view';
          }
        });
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
