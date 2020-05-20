import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IloaiPhong } from '../../../../share/entities/iloai-phong';
import { PhongserviceService } from '../../../../share/services/phongservice.service';
declare var $;
@Component({
  selector: 'app-loaiphong',
  templateUrl: './loaiphong.component.html',
  styleUrls: ['./loaiphong.component.scss']
})
export class LoaiphongComponent implements OnInit {

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
    $('#inputGroupFile01').val('');
    this.eData = data;
  }
  taoForm() {
    this.formAddNew = this.formBuilder.group({
      ten: ['', [
        Validators.required
      ]],
      gia: ['', [
        Validators.required
      ]],
      succhua: ['', [
        Validators.required
      ]],
      mota: ['', [
        Validators.required
      ]],
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
      if (res.message === 'loai phong da co') {
        $.notify("Trùng tên phòng!", "error");
      } else if (res.message === 'luu thanh cong') {
        const data = res;
        console.log(data);
        const uploaddata = new FormData();
        if (this.selectedFile) {
          uploaddata.append('loaiphongimg', this.selectedFile);
          this.phongserviceService.upanhloai(data.values._id, uploaddata).subscribe(resq => {
            if (resq.message === 'thanh cong') {
              $.notify('Đã tạo một mục mới!', 'success');
              this.getList();
              setTimeout(() => {
                $('#addnl').modal('hide');
              }, 150);
            }
          });
        }
      } else {
        $.notify("Có lỗi xảy ra với hình!", "error");
      }
    });
  }
  edit() {
    this.phongserviceService.sualoaiphong(this.eData.id, this.frmSua.value).subscribe(res => {
      console.log(res);
      if (res.message === 'thanh cong') {
        const data = res;
        const uploaddata = new FormData();
        uploaddata.append('loaiphongimg', this.selectedFile);
        console.log(this.selectedFile);
        if (this.selectedFile) {
          this.phongserviceService.upanhloai(this.eData.id, uploaddata).subscribe(resq => {
            if (resq.message === 'thanh cong') {
              $.notify('Đã cập nhật hình!', 'success');
              this.getList();
              setTimeout(() => {
                $('#detaillp').modal('hide');
              }, 150);
            } else {
              $.notify("Có lỗi xảy ra với hình!", "error");
            }
          });
        } else {
          $.notify('Đã sửa một mục!', 'success');
          this.getList();
          setTimeout(() => {
            $('#detaillp').modal('hide');
          }, 150);
        }
      } else {
        $.notify("Có lỗi xảy ra!", "error");
      }
    });
  }
  delete(id) {
    if (confirm('Bạn muốn xóa?')) {
      this.phongserviceService.xoaloaiphong(id).subscribe(res => {
        if (res.message === 'phong dang ton tai loai phong nay') {
          $.notify('Có phòng thuộc loại phòng trên', 'error');
        } else if (res.message === 'xoa thanh cong') {
          $.notify('Đã xóa 1 mục !', 'success');
          this.getList();
        }
      });
    }
  }
}
