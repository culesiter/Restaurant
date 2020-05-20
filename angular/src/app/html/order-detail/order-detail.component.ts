import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HoadonService } from '../../share/services/hoadon.service';
import { Subject } from 'rxjs';
import { LoginService } from '../../share/services/login.service';
declare var $: any;
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  private hoadonkh: any;
  private chitiet: any;
  private chitietma: any;
  private phong: any;
  private dichvu: any;
  private doi = false;
  private fade = true;
  private hdgl;
  private href;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private hoadon: HoadonService, private pay: LoginService, private hoadonS: HoadonService) { }

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
    this.layhoadon();
  }
  delete(id) {
    const action = {
      action: -1
    };
    this.hoadonS.suahoadon(id, action).subscribe(res => {
      if (res.message === 'thanh cong') {
        $('Hủy Thành Công');
      }
    });
  }
  layhoadon() {
    const khachhang = JSON.parse(localStorage.getItem('user'));
    this.hoadon.laydanhsachtheokh(khachhang._id).subscribe(Response => {
      const result = [];
      Response.forEach(element => {
        if (element.tinhtrang !== -1) {
          if (element.hinhthucthanhtoan === 3) {
            element.hinhthucthanhtoan = 2;
          }
          result.push(element);
        }
      });
      this.hoadonkh = result;
      this.dtTrigger.next();
    });
  }
  toDetail(_id, item) {
    this.hdgl = item;
    this.doi = true;
    this.fade = true;
    this.layPhong(_id);
    this.hoadon.laydanhsachtheoid(_id).subscribe(Response => {
      this.chitiet = Response;
    });
    this.hoadon.getCTHDMA(_id).subscribe(Response => {
      this.chitietma = Response;
    });
    this.hoadon.laydichvutheoid(_id).subscribe(Response => {
      if (Response.length === 0) {
        this.dichvu = false;
        return false;
      }
      this.dichvu = Response;
    });

  }
  payment(action) {
    if (action === 2) {
      const t = this.hdgl.tongtien * 0.1;
      const payment_data = {
        // tslint:disable-next-line:radix
        amount: Math.floor(t),
        customerId: this.hdgl._idkhachhang._id,
        customerEmail: this.hdgl._idkhachhang.email,
        customerPhone: this.hdgl._idkhachhang.sdt,
        orderId: this.hdgl._id,
        ref: this.hdgl._id + new Date().getMinutes() + new Date().getSeconds()
      };
      action = {
        action: 1,
        hinhthucthanhtoan: 2
      };
      this.hoadonS.suahoadon(this.hdgl._id, action).subscribe(res => {
        if (res.message === 'thanh cong') {
          this.pay.thanhtoan(payment_data).subscribe(resp => {
            $('#load').css('display', 'none');
            $.notify('Gửi yêu cầu thành công', 'success');
            this.href = resp._body;
          });
        }
      });

    } else if (action === 1) {
      const payment_data = {
        amount: this.hdgl.tongtien,
        customerId: this.hdgl._idkhachhang._id,
        customerEmail: this.hdgl._idkhachhang.email,
        customerPhone: this.hdgl._idkhachhang.sdt,
        orderId: this.hdgl._id,
        ref: this.hdgl._id + new Date().getMinutes() + new Date().getSeconds()
      };
      action = {
        action: 1,
        hinhthucthanhtoan: 1
      };
      this.hoadonS.suahoadon(this.hdgl._id, action).subscribe(res => {
        if (res.message === 'thanh cong') {
          this.pay.thanhtoan(payment_data).subscribe(resp => {
            $('#load').css('display', 'none');
            $.notify('Gửi yêu cầu thành công', 'success');
            this.href = resp._body;
          });
        }
      });
    } else if (action === 3) {
      const payment_data = {
        amount: this.hdgl.tongtien - (this.hdgl.tongtien * 0.1),
        customerId: this.hdgl._idkhachhang._id,
        customerEmail: this.hdgl._idkhachhang.email,
        customerPhone: this.hdgl._idkhachhang.sdt,
        orderId: this.hdgl._id,
        ref: this.hdgl._id + new Date().getMinutes() + new Date().getSeconds()
      };
      action = {
        action: 2,
        hinhthucthanhtoan: 3
      };
      this.hoadonS.suahoadon(this.hdgl._id, action).subscribe(res => {
        if (res.message === 'thanh cong') {
          this.pay.thanhtoan(payment_data).subscribe(resp => {
            $('#load').css('display', 'none');
            $.notify('Gửi yêu cầu thành công', 'success');
            this.href = resp._body;
          });
        }
      });
    }
  }

  layPhong(_id) {
    this.hoadon.laydanhsachtheoid(_id).subscribe(Response => {
      this.hoadon.layphongtheoid(Response[0]._idphong._id).subscribe(res => {
        this.phong = res;
        this.doi = false;
        this.fade = false;
      });
    });
  }
}
