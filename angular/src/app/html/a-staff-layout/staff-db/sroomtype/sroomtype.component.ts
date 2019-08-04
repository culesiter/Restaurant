import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IloaiPhong } from '../../../../share/entities/iloai-phong';
import { PhongserviceService } from '../../../../share/services/phongservice.service';
declare var $;
@Component({
  selector: 'app-sroomtype',
  templateUrl: './sroomtype.component.html',
  styleUrls: ['./sroomtype.component.scss']
})
export class SroomtypeComponent implements OnInit {

  private formStatus = 'view';
  private listData: IloaiPhong[] = [];
  private eData: IloaiPhong = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  constructor(private formBuilder: FormBuilder,
    private phongserviceService: PhongserviceService) { }
  ngOnInit() {
    this.taoForm();
    this.getList();
  }
  formShow(data) {
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      succhua: ['', []],
      mota: ['', []],
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []],
      succhua: ['', []],
      mota: ['', []],
    });
  }
  getList() {
    this.phongserviceService.laydanhsachloaiphong().subscribe(res => { this.listData = res });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew() {
    this.phongserviceService.themloaiphong(this.formAddNew.value).subscribe(res => {
      var data = res;
      console.log(data);
      const uploaddata = new FormData();
      uploaddata.append('loaiphongimg', this.selectedFile);
      this.phongserviceService.upanhloai(data.values._id, uploaddata).subscribe(resq => {
        if (resq) {
          $.notify('Đã tạo một mục mới!', 'success');
          this.getList();
          setTimeout(() => {
            $('#addnl').modal('hide');
          }, 150);
        }
      })
    })
  }
  edit() {
    this.phongserviceService.sualoaiphong(this.eData.id, this.frmSua.value).subscribe(res => {
      if (res) {
        var data = res;
        console.log(data);
        const uploaddata = new FormData();
        uploaddata.append('loaiphongimg', this.selectedFile);
        this.phongserviceService.upanhloai(this.eData.id, uploaddata).subscribe(resq => {
          if (resq) {
            $.notify('Đã sửa một mục!', 'success');
            this.getList();
            setTimeout(() => {
              $('#detaillp').modal('hide');
            }, 150);
          }
        })
      } else {
        $.notify("Có lỗi xảy ra!", "error");
      }
    })
  }
  delete() {
    this.phongserviceService.xoaloaiphong(this.eData.id).subscribe(res => {
      $.notify('Đã xóa 1 mục !', 'success');
      this.getList();
      setTimeout(() => {
        $('#detaillp').modal('hide');
      }, 150);
    });
  }
}

