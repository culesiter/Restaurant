import { Ithucdoninter } from './../../../../share/entities/ithucdoninter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idish } from '../../../../share/entities/idish';
import { DishserviceService } from '../../../../share/services/dishservice.service';
import { ThucdonserviceService } from '../../../../share/services/thucdonservice.service';
import { Ithucdon } from '../../../../share/entities/ithucdon';
import { Ithucdonmonan } from '../../../../share/entities/ithucdonmonan';
import { log } from 'util';
import { CartserviceService } from '../../../../share/services/cartservice.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {
  private formStatus = 'view';
  private ss = '';
  private menuTemp: Ithucdon = {};
  private listmon: Idish[] = [];
  private listThucdon: Ithucdon[] = [];
  private lstmontheothucdon: any[] = [];
  private formAddNewMenu: FormGroup;
  private tdmnTemp: Ithucdonmonan = {};
  private countTemp: number = 0;
  private currenttd;
  private tdtotal = 0;
  private styletemp = {};
  private slma = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private dishS: DishserviceService, private menuS: ThucdonserviceService, private cartsv: CartserviceService) { }
  ngOnInit() {
    this.getlistthucdon();
    this.getdsmon();
    this.taoForm();
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

  back() {
    this.getlistthucdon();
    this.formStatus = 'view';
  }
  taoForm() {
    this.formAddNewMenu = this.formBuilder.group({
      ten: ['', [
        Validators.required,
      ]],
      khuyenmai: [0, [
        Validators.required,
      ]]
    });
  }
  laysl(vl, item) {
    this.countTemp = vl.target.value;

    this.listmon.forEach(element => {
      if (element._id === item._id) {
        element['slma'] = this.countTemp;
      }
    });
    this.cartsv.addTotd(item, this.countTemp);
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    let tong = 0;
    data.forEach(element => {
      tong = tong + this.tinhgiathucdontheomonan(element.sl, element.item.gia, element.item.khuyenmai);
    });
    this.tdtotal = tong - (this.currenttd.values.khuyenmai * tong / 100);
    console.log(vl);
    if (vl === 0) {
      this.huymonantrongthucdon(item);
    }
    // this.slma = this.slma - 1;
    // this.tdtotal = this.tdtotal + this.tinhgiathucdontheomonan(this.slma, gia, km);
  }
  formShow(a, id) {
    this.formStatus = a;
    if (a === 'detail') {
      this.menuS.getmonantheoIdthucdon(id).subscribe(res => {
        this.lstmontheothucdon = res;
        console.log(res);
      });
    }
    sessionStorage.setItem('admintd', JSON.stringify([]));
  }
  getlistthucdon() {
    this.menuS.laydstd().subscribe(res => this.listThucdon = res);
  }
  getdsmon() {
    this.dishS.laydanhsachmonan().subscribe(res => {
      this.listmon = res;
      this.listmon.forEach(element => {
        element['slma'] = 0;
      });
    });
  }
  addNew() {
    // this.menuTemp = this.formAddNewMenu.value;
    this.menuS.taothucdon(this.formAddNewMenu.value).subscribe(res => {
      if (res.message === 'luu thanh cong') {
        this.menuTemp._id = res.values._id;
        this.currenttd = res;
        $.notify("Tạo thực đơn thành công! Chọn món và số lượng vào thực đơn vừa tạo!", "success");
        this.getlistthucdon();
        this.formStatus = 'addmon';
      }
    });
  }
  tinhgiathucdontheomonan(sl, gia, km) {
    if (km > 0) {
      return sl * gia - (sl * gia * km / 100);
    }
    return sl * gia;
  }
  kiemtramondachonchotd(item) {
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    if (data && data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        if (item._id === data[i].item._id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
  huymonantrongthucdon(item) {
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    if (data && data.length !== 0) {
      console.log('davao');
      data.forEach(element => {
        console.log(item, element);
        if (item._id === element.item._id) {

          const index = data.indexOf(element);
          data.splice(index, 1);
          // tslint:disable-next-line:max-line-length
          this.tdtotal = (this.tdtotal + (this.tdtotal * this.currenttd.values.khuyenmai / 100)) - (item.slma * item.gia - (item.slma * item.gia * item.khuyenmai / 100));
          item.slma = 0;
        }
      });
      sessionStorage.setItem('admintd', JSON.stringify(data));
    }
  }
  themmonanhd(item) {
    this.tdmnTemp._idmonan = item._id;
    this.tdmnTemp.soluong = this.countTemp;
    this.tdmnTemp._idthucdon = this.menuTemp._id;
    console.log(this.tdmnTemp);

    this.listmon.forEach(element => {
      if (element._id === item._id) {
        element['slma'] = 1;
      }
    });

    this.cartsv.addTotd(item, 1);
    const data = JSON.parse(sessionStorage.getItem('admintd'));
    let tong = 0;
    data.forEach(element => {
      tong = tong + this.tinhgiathucdontheomonan(element.sl, element.item.gia, element.item.khuyenmai);
    });
    this.tdtotal = tong - (this.currenttd.values.khuyenmai * tong / 100);

    // this.menuS.taothucdonmonan(this.tdmnTemp).subscribe(res => {
    //   if (res) {
    //     this.styletemp = 'color: #4caf50 !important';
    //   }
    // });
  }
  themtdvaocsdl() {
    const td = JSON.parse(sessionStorage.getItem('admintd'));
    $('#load').css('display', 'block');
    td.forEach(element => {
      const data = {
        _idthucdon: this.currenttd.values._id,
        _idmonan: element.item._id,
        soluong: element.sl
      };
      this.menuS.taothucdonmonan(data).subscribe(res => {
        console.log(res);
      });
    });
    const value = {
      gia: this.tdtotal
    };
    this.dishS.suathucdon(this.currenttd.values._id, value).subscribe(res => {
      if (res.message === 'thanh cong') {
        $('#load').css('display', 'none');
        this.getlistthucdon();
        this.formStatus = 'view';
      }
    });
  }
  xoatd(id) {
    var temp_confirm = confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (temp_confirm == true) {
      this.menuS.xoaThucDonMonAn(id).subscribe(res => {
        this.menuS.xoathucdon(id).subscribe(res => {
          if (res.message === 'hoa don chua') {
            $.notify("Có hóa đơn chứa thực đơn trên", "error");
          } else {
            $.notify("Đã xóa 1 mục", "success");
            this.getlistthucdon();
          }
        })
      })
    }
  }
}
