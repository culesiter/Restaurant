import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../share/services/staff.service';
declare var $: any;
@Component({
  selector: 'app-s-viewsalary',
  templateUrl: './s-viewsalary.component.html',
  styleUrls: ['./s-viewsalary.component.scss']
})
export class SViewsalaryComponent implements OnInit {
  private currentyear = new Date().getFullYear();
  private currentmonth = new Date().getMonth() + 1;
  private currentsalary;
  private usertemp = JSON.parse(localStorage.getItem('staff'));
  constructor(private luongsv: StaffService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('staff'));
    if (user) {
      this.laybangluongcuaminh(user._id);
    }
  }
  laybangluongcuaminh(id) {
    this.luongsv.laybangluongtheoid(id).subscribe(res => {
      res.forEach(element => {
        console.log(element.thangtra, this.currentmonth, element.thangtra == this.currentmonth, element.namtra == this.currentyear);
        if (element.thangtra == this.currentmonth && element.namtra == this.currentyear) {
          this.currentsalary = element;
        }
      });
    });
  }
  laybangluongtruocdo(id) {
    let check = false;
    if (this.currentmonth > 1) {
      this.currentmonth = this.currentmonth - 1;
    }
    this.luongsv.laybangluongtheoid(id).subscribe(res => {
      res.forEach(element => {
        console.log(element.thangtra, this.currentmonth, element.thangtra == this.currentmonth, element.namtra == this.currentyear);
        if (element.thangtra == this.currentmonth && element.namtra == this.currentyear) {
          this.currentsalary = element;
          check = true;
        }
      });
      if (check == false) {
        this.currentsalary = false;
      }
      $('.wrap-sla').css('visibility', 'visible');
    });
  }
  laybangluongsaudo(id) {
    if (this.currentmonth < 12) {
      this.currentmonth = this.currentmonth + 1;
    }
    let check = false;
    this.luongsv.laybangluongtheoid(id).subscribe(res => {
      res.forEach(element => {
        if (element.thangtra == this.currentmonth && element.namtra == this.currentyear) {
          this.currentsalary = element;
          check = true;
        }
      });
      if (check == false) {
        this.currentsalary = false;
      }
      $('.wrap-sla').css('visibility', 'visible');
    });
  }
  bangluongtruoc() {
    $('.wrap-sla').css('visibility', 'hidden');
    if (this.usertemp) {
      this.laybangluongtruocdo(this.usertemp._id);
    }
  }
  bangluongsau() {
    $('.wrap-sla').css('visibility', 'hidden');
    if (this.usertemp) {

      this.laybangluongsaudo(this.usertemp._id);
    }
  }
}
