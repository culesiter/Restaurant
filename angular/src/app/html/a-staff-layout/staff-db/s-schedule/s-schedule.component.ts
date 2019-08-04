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
  selector: 'app-s-schedule',
  templateUrl: './s-schedule.component.html',
  styleUrls: ['./s-schedule.component.scss']
})
export class SScheduleComponent implements OnInit, OnChanges {


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
    const user = JSON.parse(localStorage.getItem('staff'));
    if (user) {
      this.getList(this.currentDate.month() + 1, user._id);
    }
    this.generateCalendar();
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

  isToday2(date: moment.Moment): boolean {
    console.log(date);
    return moment().isSame(moment(date), 'day');
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
    return moment().isSame(moment(date), 'day');
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
      const user = JSON.parse(localStorage.getItem('staff'));
      if (user) {
        this.getList(this.currentDate.month() + 1, user._id);
      }
      this.generateCalendar();
    }

  }

  nextMonth(): void {
    if (this.currentDate.month() > 12) {

    } else {
      this.currentDate = moment(this.currentDate).add(1, 'months');
      const user = JSON.parse(localStorage.getItem('staff'));
      if (user) {
        this.getList(this.currentDate.month() + 1, user._id);
      }
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


  getList(thang, id) {
    this.staff.laylichlamtheoid(id).subscribe(res => {
      console.log(res);
      this.listData = res;
      res.forEach(element2 => {
        if (element2.thang == thang && element2._idnhanvien._id === id && element2.nam == this.currentyear) {
          console.log(element2);
          // tslint:disable-next-line:max-line-length
          sessionStorage.setItem('date', JSON.stringify(this.getDaysArray(this.currentyear, this.currentDate.month() + 1, element2.thulam)));
          this.generateCalendar();
        }
      });
    });
  }


}
