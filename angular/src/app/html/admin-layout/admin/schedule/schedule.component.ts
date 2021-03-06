import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { StaffService } from '../../../../share/services/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../../../share/services/contacService/Excel.service';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';
declare var $: any;

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  ch?: boolean;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnChanges {

  private listData: any[];
  private serchform: FormGroup;
  private data: any;
  private tongluong: number;
  private mounthde = '1';
  private bangluong: any[];
  private currentyear = new Date().getFullYear();

  private day = [];
  private result;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  currentDate = moment();
  private currentmonth = this.currentDate;

  dayNames = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  mang = ['2019-08-23'];
  @Input() selectedDates: CalendarDate[] = [];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectDate = new EventEmitter<CalendarDate>();


  constructor(private staff: StaffService, private formBuilder: FormBuilder, private excelService: ExcelService) { }

  ngOnInit() {
    this.form();
    this.nextMonth();
    this.getList((this.currentDate.month() + 1));
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
    this.generateCalendar();
  }


  daytomodal() {
    const day = JSON.parse(sessionStorage.getItem('day'));
    const u = JSON.parse(sessionStorage.getItem('staffbydate'));
    if (day && u) {
      const data = {
        tinhtrang: 0,
        thang: this.currentDate.month() + 1,
        nam: this.currentyear,
        thulam: day,
        _idnhanvien: u._id
      };
      this.staff.themlichlam(data).subscribe(res => {
        if (res.message = 'luu thanh cong') {
          $.notify('Đã tạo một món ăn mới!', 'success');
          setTimeout(() => {
            $('#myModal').modal('hide');
          }, 150);
          this.getList((this.currentDate.month() + 1));
        }
        console.log(res);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }
  addthu(day) {

    if (this.day.length === 0) {
      this.day.push(day);
    } else {
      let i = -1;
      for (let index = 0; index < this.day.length; index++) {
        if (day === this.day[index]) {
          i = index;
        }
      }
      if (i === -1) {
        this.day.push(day);
      } else {
        this.day.splice(i, 1);
      }
    }
    sessionStorage.setItem('day', JSON.stringify(this.day));
    sessionStorage.setItem('date', JSON.stringify(this.getDaysArray(this.currentyear, this.currentDate.month() + 1, this.day)));
    this.generateCalendar();
  }
  getDaysArray(year, month, day) {
    var names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var date = new Date(year, month - 1, 1);
    var result = [];
    while (date.getMonth() == month - 1) {
      day.forEach(element => {
        if (date.getDay() == element) {
          result.push(moment(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(), 'DD-MM-YYYY'));
        }
      });
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  isToday(date: moment.Moment): boolean {
    const date1 = JSON.parse(sessionStorage.getItem('date'));
    let check = false;
    if (date1) {
      date1.forEach(element => {
        if (moment(element).isSame(moment(date), 'day')) {
          check = true;
          // return true;
        }
      });
    }
    if (check == false) {
      return false;
    }
    return true;
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  // actions from calendar

  prevMonth(): void {
    if (this.currentDate.month() < 1) {

    } else {
      this.currentDate = moment(this.currentDate).subtract(1, 'months');
      this.getList(this.currentDate.month() + 1);
      this.generateCalendar();
    }

  }

  nextMonth(): void {
    if (this.currentDate.month() > 12) {

    } else {
      this.currentDate = moment(this.currentDate).add(1, 'months');
      this.getList(this.currentDate.month() + 1);
      this.generateCalendar();
    }
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
        };
      });
  }
  exportAsXLSX(): void {
    const salary_arr = [];
    salary_arr.push(this.bangluong);
    this.excelService.exportAsExcelFile(salary_arr, 'Bang_luong_');
  }
  form() {
    this.serchform = this.formBuilder.group({
      thang: [this.currentmonth, [
      ]]
    });
  }

  getList(thang) {
    this.staff.laydanhsach().subscribe(res => {
      this.listData = res;
      this.staff.laylichlam().subscribe(response => {
        console.log(thang, response);
        this.listData.forEach(element => {
          element['tao'] = 'chuatao';
          response.forEach(element2 => {
            if (element2.thang == thang && element2._idnhanvien._id === element._id && element2.nam == this.currentyear) {
              element['tao'] = 'datao';
            }
          });
        });
        this.dtTrigger.next();
      });
    });
  }
  calc(item) {
    sessionStorage.setItem('date', JSON.stringify([]));
    sessionStorage.setItem('staffbydate', JSON.stringify(item));
    this.generateCalendar();
  }
  calc2(ngay, luong) {
    console.log(ngay * luong);
    this.tongluong = ngay * luong;
  }
  calc3(data, ngay, tongluong) {
    const wrap = {
      _idnhanvien: data._id,
      songaylam: ngay,
      tongluong: tongluong,
      thangtra: this.serchform.value.thang || this.currentmonth,
      namtra: this.currentyear,
      cap: data._idcapnhanvien.cap,
      luongtheongay: data._idcapnhanvien.luongtheongay
    };
    this.staff.thembangluong(wrap).subscribe(response => {
      console.log(response);
      if (response.message === 'luu thanh cong') {
        $.notify('Lương đã được tính!', 'success');
        this.getList(this.serchform.value.thang || this.currentmonth);
        setTimeout(() => {
          $('#myModal').modal('hide');
        }, 150);
      }
    });
  }
  search() {
    console.log(this.currentDate.month());

    this.mounthde = this.serchform.value.thang;
    this.getList(this.serchform.value.thang);
  }
  detail(item) {
    this.staff.laybangluongtheoid(item._id).subscribe(res => {
      res.forEach(element => {
        if (element.thangtra === this.mounthde) {
          this.bangluong = element;
        }
      });
    });
  }
}
