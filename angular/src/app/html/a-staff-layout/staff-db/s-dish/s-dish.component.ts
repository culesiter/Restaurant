import { Component, OnInit } from '@angular/core';
import { Idish } from '../../../../share/entities/idish';
import { DishserviceService } from '../../../../share/services/dishservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iloaimon } from '../../../../share/entities/iloaimon';
import { log } from 'util';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-s-dish',
  templateUrl: './s-dish.component.html',
  styleUrls: ['./s-dish.component.scss']
})
export class SDishComponent implements OnInit {

  private formStatus = 'view';
  private newDish: Idish = {};
  private editDish: Idish = {};
  private listDish: Idish[] = [];
  private lstType: iloaimon[] = [];
  private formAdd: FormGroup;
  private formEdit: FormGroup;
  private styleExp = 'none';
  private selectedFile: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private dishserviceService: DishserviceService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.taoForm();
    this.getAllDish();
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
    this.dishserviceService.laydsloaimon().subscribe(res => this.lstType = res);
  }
  taoForm() {
    this.formAdd = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      _idloai: ['', []],
      khuyenmai: ['', []],
    });
    this.formEdit = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      _idloai: ['', []],
      loai: ['', []],
      khuyenmai: ['', []],
    })
  }
  taoMon() {
    console.log(this.formAdd.value);
  }
  formShow(a, data) {
    this.formStatus = a;
    this.editDish = data;
  }
  detailview(data) {
    this.editDish = data;
  }
  xoaForm() {
    this.formAdd.reset();
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  createNewDish() {
    this.newDish = this.formAdd.value;
    this.dishserviceService.themMonaAn(this.newDish).subscribe(res => {
      var data = res;
      const uploaddata = new FormData();
      uploaddata.append('monanimg', this.selectedFile);
      console.log(uploaddata);
      this.dishserviceService.upanh(data.values._id, uploaddata).subscribe(resq => {
        if (resq) {
          $.notify("Đã thêm 1 mục", "success");
          setTimeout(() => {
            $('#add-dish').modal('hide');
          }, 150);
          this.getAllDish();
          this.formStatus = 'view';
        }
      })
    });
  }
  getAllDish() {
    this.dishserviceService.laydanhsachmonan().subscribe(res => {
      if (res) {
        this.listDish = res;
        this.dtTrigger.next();
      } else {
        console.log('Err');
      }
    });
  }
  deleteDish(id) {
    if (confirm('Bạn có muốn xóa món ăn này?')) {
      this.dishserviceService.xoaMonAn(id).subscribe(res => {
        console.log(res);
        if (res) {
          $.notify("Đã xóa 1 mục", "success");
          this.getAllDish();
          this.formStatus = 'view';
        } else {
          alert('err');
        }
      })
    }
  }
  editExistDish() {
    const id = this.editDish._id;
    this.dishserviceService.suaMonAn(id, this.formEdit.value).subscribe(res => {
      if (res) {
        var data = res;
        const uploaddata = new FormData();
        uploaddata.append('monanimg', this.selectedFile);
        console.log(uploaddata);
        this.dishserviceService.upanh(id, uploaddata).subscribe(resq => {
          if (resq) {
            alert('thanh cong!');
            this.getAllDish();
            this.formStatus = 'view';
          }
        })
      } else {
        alert('failed');
      }
    })
  }
  xoaAnhluon() {
    $.notify("Đã xóa 1 ảnh", "success");
  }
  mouseEnterDelete() {
    this.styleExp = 'block';
  }
  mouseLeaveDelete() {
    this.styleExp = 'none';
  }

}
