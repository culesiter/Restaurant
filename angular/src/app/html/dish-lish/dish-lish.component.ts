import { Router } from '@angular/router';
import { ThucdonserviceService } from './../../share/services/thucdonservice.service';
import { Ithucdon } from './../../share/entities/ithucdon';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Idish } from './../../share/entities/idish';
import { DishserviceService } from './../../share/services/dishservice.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dish-lish',
  templateUrl: './dish-lish.component.html',
  styleUrls: ['./dish-lish.component.scss'],

})
export class DishLishComponent implements OnInit {

  private dishs: Idish[];
  private dishs2: Idish[];
  private thucdons: Ithucdon[];
  private monans: Ithucdon[];
  private mo: number = 1;
  private frmTimKiem: FormGroup;
  private doDai: number = 0;

  constructor(private router: Router, private thucdonservice: ThucdonserviceService, private dishservice: DishserviceService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.danhSachMonAn();
    if (window.location.pathname == "/home/dish/thucdon") {
      this.mo = 2;
    }
    this.doiTaiTrang();
    this.showdishs();
    this.showdishs2();
    this.taoForm();
    this.trinhThucDon();
    this.ThanhTimKiemScroll();

  }
  ThanhTimKiemScroll()
  {
    
  }
  denTrangChiTiet(id) {
    this.router.navigate(['/home/monan/' + id]);
  }
  danhSachMonAn() {
    this.thucdonservice.laydanhsachThucDon().subscribe(response => {
      this.monans = response;
    })

  }
  moTab1() {
    this.mo = 2;
  }
  moTab2() {
    this.mo = 1;
  }
  trinhThucDon() {
    this.thucdonservice.laydanhsachmonanTrungBay().subscribe(response => {
      this.thucdons = response;
    })
  }

  doiTaiTrang() {
    $(function () {
      $(".loader1").fadeOut(500, function () {
        $(".conten").fadeIn(3000);
      });
    })
  }
  taoForm() {
    this.frmTimKiem = this.formbuilder.group({
      khuyenmai: ['', []],
      loai: ['', []],
      hinhthuc: ['1', []]
    })
  }
  kiemTraTop(mo) {
    window.onscroll = function () { myFunction() };

    function myFunction() {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("header").className = "display";
        document.getElementById("header1").className = "";


      } else {
        document.getElementById("header").className = "";
        document.getElementById("header1").className = "display";
      }
    }

  }
  showdishs() {
    this.dishservice.laydanhsachmonan().subscribe(response => {


      this.dishs = response;
    })

  }
  showdishs2() {
    this.dishservice.laydanhsachmonan().subscribe(response => {
      this.dishs2 = response;
    })

  }
  layGiaTriForeach() {


    if (this.frmTimKiem.value.hinhthuc == 2) {

      console.log('thuchien');



    }
    else {
      this.router.navigate(['home/dish/monan']);
      this.mo = 1;
      if (this.frmTimKiem.value.loai) {
        if (this.frmTimKiem.value.khuyenmai == 1) {
          this.dishs = [];
          this.dishservice.laydanhsachmonan().subscribe(response => {

            response.forEach(res => {
              if (res.khuyenmai > 1 && res.khuyenmai <= 50 && res.loai == this.frmTimKiem.value.loai) {
                this.dishs.push(res);
              }
            })


          })
        } else if (this.frmTimKiem.value.khuyenmai == 2) {
          this.dishs = [];
          this.dishservice.laydanhsachmonan().subscribe(response => {

            response.forEach(res => {
              if (res.khuyenmai > 50 && res.loai == this.frmTimKiem.value.loai) {
                this.dishs.push(res);
              }
            })
          })
        }
        else {
          this.dishs = [];
          this.dishservice.laydanhsachmonan().subscribe(response => {

            response.forEach(res => {
              if (res.loai == this.frmTimKiem.value.loai) {
                this.dishs.push(res);
              }
            })
          })
        }

      }
      else {
        if (this.frmTimKiem.value.khuyenmai == 1) {
          this.dishs = [];
          this.dishservice.laydanhsachmonan().subscribe(response => {

            response.forEach(res => {
              if (res.khuyenmai > 1 && res.khuyenmai <= 50) {
                this.dishs.push(res);
              }
            })


          })
        } else if (this.frmTimKiem.value.khuyenmai == 2) {
          this.dishs = [];
          this.dishservice.laydanhsachmonan().subscribe(response => {

            response.forEach(res => {
              if (res.khuyenmai > 50) {
                this.dishs.push(res);
              }
            })


          })
        }
        else {
          this.dishs = [];
          this.showdishs();
        }
      }
    }


  }
  layGiaTri() {



    if (this.frmTimKiem.value.hinhthuc == 2) {
      this.mo = 2;

    }
    else {

      this.mo = 1;
      if (this.frmTimKiem.value.loai) {
        if (this.frmTimKiem.value.khuyenmai == 1) {

          this.dishservice.laydanhsachmonan().subscribe(response => {

            this.dishs = response.map(res => {
              if (res.khuyenmai > 1 && res.khuyenmai <= 50 && res.loai == this.frmTimKiem.value.loai) {
                return res;
              }
            })
            console.log(this.dishs.length);

          })
        } else if (this.frmTimKiem.value.khuyenmai == 2) {
          this.dishservice.laydanhsachmonan().subscribe(response => {
            this.dishs = response.map(res => {
              if (res.khuyenmai > 50 && res.loai == this.frmTimKiem.value.loai) {
                return res;
              }
            })
            console.log(this.dishs.length);
          })
        }
        else {
          this.dishservice.laydanhsachmonan().subscribe(response => {
            this.dishs = response.map(res => {
              if (res.loai == this.frmTimKiem.value.loai) {
                return res;
              }
            })
            console.log(this.dishs.length);
          })
        }

      }
      else {
        if (this.frmTimKiem.value.khuyenmai == 1) {
          this.dishservice.laydanhsachmonan().subscribe(response => {
            this.dishs = response.map(res => {
              if (res.khuyenmai > 1 && res.khuyenmai <= 50) {
                return res;
              }
            })
            console.log(this.dishs.length);
          })
        } else if (this.frmTimKiem.value.khuyenmai == 2) {
          this.dishservice.laydanhsachmonan().subscribe(response => {
            this.dishs = response.map(res => {
              if (res.khuyenmai > 50) {
                return res;
              }
            })
          })
        }
        else {
          this.showdishs();
        }
      }
    }


  }
  layGiaTriThu() {

    if (this.frmTimKiem.value.hinhthuc == 2) {
      this.mo = 2;
    }
    else {
      this.mo = 1;


      if (this.frmTimKiem.value.khuyenmai == 1) {
        if (this.frmTimKiem.value.loai) {
          this.dishs = [];
          this.dishservice.laydanhsachmonan().subscribe(response => {


            response.forEach(res => {
              if (res.khuyenmai > 1 && res.khuyenmai <= 50 && res.loai == this.frmTimKiem.value.loai) {
                this.dishs.push(res);
              }
            })
          })
        } else {
          this.dishservice.laydanhsachmonan().subscribe(response => {


            this.dishs = response.map(res => {
              if (res.khuyenmai > 1 && res.khuyenmai <= 50) {
                return res;
              }
            })
          })
        }
      } else if (this.frmTimKiem.value.khuyenmai == 2) {

        if (this.frmTimKiem.value.loai) {
          this.dishservice.laydanhsachmonan().subscribe(response => {
            console.log('chay1');

            this.dishs = response.map(res => {
              if (res.khuyenmai > 50 && res.loai == this.frmTimKiem.value.loai) {
                return res;
              }
            })
          })
        } else {
          this.dishservice.laydanhsachmonan().subscribe(response => {


            this.dishs = response.map(res => {
              if (res.khuyenmai > 50) {
                return res;
              }
            })
          })
        }
      } else {
        if (this.frmTimKiem.value.loai) {
          this.dishservice.laydanhsachmonan().subscribe(response => {
            console.log('chay1');

            this.dishs = response.map(res => {
              if (res.loai == this.frmTimKiem.value.loai) {
                return res;
              }
            })
          })
        } else {
          this.showdishs();
        }

      }

    }




  }

}
