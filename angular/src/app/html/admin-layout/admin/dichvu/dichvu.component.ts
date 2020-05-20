import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idichvu } from '../../../../share/entities/idichvu';
import { DichvuService } from '../../../../share/services/dichvu.service';
declare var $;
@Component({
  selector: 'app-dichvu',
  templateUrl: './dichvu.component.html',
  styleUrls: ['./dichvu.component.scss']
})
export class DichvuComponent implements OnInit {

  private formStatus = 'view';
  private listData: Idichvu[] = [];
  private eData: Idichvu = {};
  private formAddNew: FormGroup;
  private frmSua: FormGroup;
  private selectedFile: any;
  constructor(private formBuilder: FormBuilder,
    private dvservices: DichvuService) { }
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
      gia: ['', []]
    });
    this.frmSua = this.formBuilder.group({
      ten: ['', []],
      gia: ['', []]
    });
  }
  getList() {
    this.dvservices.laydanhsachDV().subscribe(res => { this.listData = res });
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }
  addNew() {
    this.dvservices.themDV(this.formAddNew.value).subscribe(res => {
      if (res.message === 'dich vu da co') {
        $.notify('Trùng tên', 'error');
      } else {
        const data = res;
        const uploaddata = new FormData();
        uploaddata.append('dichvuimg', this.selectedFile);
        console.log(uploaddata);
        this.dvservices.upanh(data.values._id, uploaddata).subscribe(resq => {
          console.log(resq);
          if (resq.message === 'thanh cong') {
            $.notify('Đã tạo một mục mới!', 'success');
            this.getList();
            $('#adds').modal('hide');
            this.formStatus = 'view';
          }
        });
      }
    });
  }
  edit() {
    this.dvservices.suaDV(this.eData._id, this.frmSua.value).subscribe(res => {
      if (res.message === 'thanh cong') {
        const data = res;
        const uploaddata = new FormData();
        uploaddata.append('dichvuimg', this.selectedFile);
        if (this.selectedFile) {
          this.dvservices.upanh(this.eData._id, uploaddata).subscribe(resq => {
            console.log(resq);
            if (resq.message === 'thanh cong') {
              $.notify('Đã sửa một mục!', 'success');
              this.getList();
              this.formStatus = 'view';
              setTimeout(() => {
                $('#detailmd').modal('hide');
              }, 150);

            }
          });
        } else {
          $.notify('Đã sửa một mục!', 'success');
          this.getList();
          setTimeout(() => {
            $('#detailmd').modal('hide');
          }, 150);
        }
      } else {
        $.notify("Có lỗi xảy ra!", "error");
      }
    })
  }
  delete(id) {
    this.dvservices.xoaDV(id).subscribe(res => {
      console.log(res);
      if (res.message === 'xoa thanh cong') {
        this.getList();
        setTimeout(() => {
          $('#detailmd').modal('hide');
        }, 150);
        this.formStatus = 'view';
      } else {
        $.notify("Có hóa đơn chưa dịch vụ trên", "error");
      }

    });
  }
}
