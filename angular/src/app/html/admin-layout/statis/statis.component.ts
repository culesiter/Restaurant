import { Component, OnInit, isDevMode, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { HoadonService } from '../../../share/services/hoadon.service';
const moment = require('moment');
@Component({
  selector: 'app-statis',
  templateUrl: './statis.component.html',
  styleUrls: ['./statis.component.scss']
})
export class StatisComponent implements OnInit {
  @Input() chartData: any[] = [{ data: [] }];
  @Input() chartData2: any[] = [{ data: [] }];
  @Input() chartData3: any[] = [{ data: [] }];
  @Input() chartData4: any[] = [{ data: [] }];
  private data1 = [{
    label: '1st Year',
    data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59]
  },
  {
    label: '2nd Year',
    data: [47, 9, 28, 54, 77, 51, 24]
  }];
  private hddm;
  private title: any;
  private chartOptions;
  private mchart = [];
  private mchart2 = [];
  private mchart3 = [];
  private mchart4 = [];
  private labels;
  private colors;
  private title2: any;
  private chartOptions2;
  private labels2;
  private colors2;
  private title3: any;
  private chartOptions3;
  private labels3;
  private colors3;
  private title4: any;
  private chartOptions4;
  private labels4;
  private colors4;
  constructor(private hoadonS: HoadonService) { }

  ngOnInit() {

  }

  laydsHoadon() {
    this.hoadonS.laydanhsach().subscribe(res => {
      this.hddm = [];
      res.forEach(element => {
        if (element.tinhtrang === 2) {
          this.hddm.push(element);
          const m = element.thoidiemtao;
          this.laycthd(element._id, moment(element.thoidiemden, 'DD/MM/YYYY').month());
        }
      });
    });
  }
  laycthd(id, month) {
    this.hoadonS.getCTHD(id).subscribe(res => {
      res.forEach(element => {
        if (element._idmonan) {
          const value = {
            label: element._idmonan.ten,
            id: element._idmonan._id,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          };
          value.data[month] = element.soluongmonan;
          if (sessionStorage.getItem('chart') === null || JSON.parse(sessionStorage.getItem('chart')).length === 0) {
            this.mchart.push(value);
            sessionStorage.setItem('chart', JSON.stringify(this.mchart));
          } else {
            this.mchart = JSON.parse(sessionStorage.getItem('chart'));
            let index = -1;
            for (let i = 0; i < this.mchart.length; i++) {
              if (this.mchart[i].id === element._idmonan._id) {
                index = i;
                break;
              }
            }
            if (index === -1) {
              this.mchart.push(value);
              sessionStorage.setItem('chart', JSON.stringify(this.mchart));
            } else {
              const temp = this.mchart[index];
              temp.data[month] = temp.data[month] + element.soluongmonan;
              this.mchart[index] = temp;
              sessionStorage.setItem('chart', JSON.stringify(this.mchart));
            }
          }
        }
      });
      this.chartData = JSON.parse(sessionStorage.getItem('chart'));
    });
  }
  laydsHoadon2() {
    this.hoadonS.laydanhsach().subscribe(res => {
      this.hddm = [];
      res.forEach(element => {
        if (element.tinhtrang === 2) {
          this.hddm.push(element);
          const m = element.thoidiemtao;
          this.laycthd2(element._id, moment(element.thoidiemden, 'DD/MM/YYYY').month());
        }
      });
    });
  }
  laycthd2(id, month) {
    this.hoadonS.getCTHD(id).subscribe(res => {
      res.forEach(element => {
        if (element._idmonan) {
          const value = {
            label: element._idmonan.ten,
            id: element._idmonan._id,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          };
          // tslint:disable-next-line:max-line-length
          value.data[month] = element.soluongmonan * element._idmonan.gia - (element.soluongmonan * element._idmonan.gia * element._idmonan.khuyenmai / 100);
          console.log(value.data[month]);

          if (sessionStorage.getItem('chart2') === null || JSON.parse(sessionStorage.getItem('chart2')).length === 0) {
            this.mchart2.push(value);
            sessionStorage.setItem('chart2', JSON.stringify(this.mchart2));
          } else {
            this.mchart2 = JSON.parse(sessionStorage.getItem('chart2'));
            let index = -1;
            for (let i = 0; i < this.mchart2.length; i++) {
              if (this.mchart2[i].id === element._idmonan._id) {
                index = i;
                break;
              }
            }
            if (index === -1) {
              this.mchart2.push(value);
              sessionStorage.setItem('chart2', JSON.stringify(this.mchart2));
            } else {
              const temp = this.mchart2[index];
              // tslint:disable-next-line:max-line-length
              temp.data[month] = temp.data[month] + element.soluongmonan * element._idmonan.gia - (element.soluongmonan * element._idmonan.gia * element._idmonan.khuyenmai / 100);
              this.mchart2[index] = temp;
              sessionStorage.setItem('chart2', JSON.stringify(this.mchart2));
            }
          }
        }
      });
      this.chartData2 = JSON.parse(sessionStorage.getItem('chart2'));
    });
  }
  laydsHoadon3() {
    this.hoadonS.laydanhsach().subscribe(res => {
      this.hddm = [];
      res.forEach(element => {
        if (element.tinhtrang === 2) {
          this.hddm.push(element);
          const m = element.thoidiemtao;
          this.laycthd3(element._id, moment(element.thoidiemden, 'DD/MM/YYYY').month());
        }
      });
    });
  }
  laycthd3(id, month) {
    this.hoadonS.getCTHD(id).subscribe(res => {
      res.forEach(element => {
        if (element._idthucdon) {
          const value = {
            label: element._idthucdon.ten,
            id: element._idthucdon._id,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          };
          value.data[month] = element.soluongthucdon;
          if (sessionStorage.getItem('chart3') === null || JSON.parse(sessionStorage.getItem('chart3')).length === 0) {
            this.mchart3.push(value);
            sessionStorage.setItem('chart3', JSON.stringify(this.mchart3));
          } else {
            this.mchart3 = JSON.parse(sessionStorage.getItem('chart3'));
            let index = -1;
            for (let i = 0; i < this.mchart3.length; i++) {
              if (this.mchart3[i].id === element._idthucdon._id) {
                index = i;
                break;
              }
            }
            if (index === -1) {
              this.mchart3.push(value);
              sessionStorage.setItem('chart3', JSON.stringify(this.mchart3));
            } else {
              const temp = this.mchart3[index];
              temp.data[month] = temp.data[month] + element.soluongthucdon;
              this.mchart3[index] = temp;
              sessionStorage.setItem('chart3', JSON.stringify(this.mchart3));
            }
          }
        }
      });
      this.chartData3 = JSON.parse(sessionStorage.getItem('chart3'));
    });
  }
  laydsHoadon4() {
    this.hoadonS.laydanhsach().subscribe(res => {
      this.hddm = [];
      res.forEach(element => {
        if (element.tinhtrang === 2) {
          this.hddm.push(element);
          const m = element.thoidiemtao;
          this.laycthd4(element._id, moment(element.thoidiemden, 'DD/MM/YYYY').month());
        }
      });
    });
  }
  laycthd4(id, month) {
    this.hoadonS.getCTHD(id).subscribe(res => {
      res.forEach(element => {
        if (element._idthucdon) {
          const value = {
            label: element._idthucdon.ten,
            id: element._idthucdon._id,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          };
          // tslint:disable-next-line:max-line-length
          value.data[month] = element.soluongthucdon * element._idthucdon.gia;
          if (sessionStorage.getItem('chart4') === null || JSON.parse(sessionStorage.getItem('chart4')).length === 0) {
            this.mchart4.push(value);
            sessionStorage.setItem('chart4', JSON.stringify(this.mchart4));
          } else {
            this.mchart4 = JSON.parse(sessionStorage.getItem('chart4'));
            let index = -1;
            for (let i = 0; i < this.mchart4.length; i++) {
              if (this.mchart4[i].id === element._idthucdon._id) {
                index = i;
                break;
              }
            }
            if (index === -1) {
              this.mchart4.push(value);
              sessionStorage.setItem('chart4', JSON.stringify(this.mchart4));
            } else {
              const temp = this.mchart4[index];
              // tslint:disable-next-line:max-line-length
              temp.data[month] = element.soluongthucdon * element._idthucdon.gia;
              this.mchart4[index] = temp;
              sessionStorage.setItem('chart4', JSON.stringify(this.mchart4));
            }
          }
        }
      });
      this.chartData4 = JSON.parse(sessionStorage.getItem('chart4'));
    });
  }
  showmodal() {
    this.mchart = [];
    sessionStorage.setItem('chart', JSON.stringify([]));
    this.laydsHoadon();
    if (sessionStorage.getItem('chart')) {
      this.title = 'Biểu Đồ tiêu thụ món ăn năm 2019';

      // ADD CHART OPTIONS.
      this.chartOptions = {
        responsive: true,   // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1
            },
            scaleLabel: {
              display: true,
              labelString: 'Số lượng mua'
            }
          }]
        }
      };
      // tslint:disable-next-line:max-line-length
      this.labels = ['Tháng 1', 'Tháng 2', 'Tháng 2', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      // setTimeout(() => {
      //   console.log(JSON.parse(sessionStorage.getItem('chart')));

      // }, 3000);
    }
  }
  showmodal2() {
    this.mchart2 = [];
    sessionStorage.setItem('chart2', JSON.stringify([]));
    this.laydsHoadon2();
    if (sessionStorage.getItem('chart2')) {

      this.title2 = 'Biểu Đồ tiêu thụ món ăn năm 2019';

      // ADD CHART OPTIONS.
      this.chartOptions2 = {
        responsive: true,   // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 50000
            },
            scaleLabel: {
              display: true,
              labelString: 'VNĐ'
            }
          }]
        }
      };
      // tslint:disable-next-line:max-line-length
      this.labels2 = ['Tháng 1', 'Tháng 2', 'Tháng 2', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      // setTimeout(() => {
      //   console.log(JSON.parse(sessionStorage.getItem('chart')));

      // }, 3000);
    }
  }
  showmodal3() {
    this.mchart3 = [];
    sessionStorage.setItem('chart3', JSON.stringify([]));
    this.laydsHoadon3();
    if (sessionStorage.getItem('chart3')) {

      this.title3 = 'Biểu Đồ tiêu thụ thực đơn năm 2019';

      // ADD CHART OPTIONS.
      this.chartOptions3 = {
        responsive: true,   // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1
            },
            scaleLabel: {
              display: true,
              labelString: 'Số lượng mua'
            }
          }]
        }
      };
      // tslint:disable-next-line:max-line-length
      this.labels3 = ['Tháng 1', 'Tháng 2', 'Tháng 2', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      // setTimeout(() => {
      //   console.log(JSON.parse(sessionStorage.getItem('chart')));

      // }, 3000);
    }
  }
  showmodal4() {
    this.mchart4 = [];
    sessionStorage.setItem('chart4', JSON.stringify([]));
    this.laydsHoadon4();
    if (sessionStorage.getItem('chart4')) {

      this.title4 = 'Biểu Đồ tiêu thụ thực đơn năm 2019';

      // ADD CHART OPTIONS.
      this.chartOptions4 = {
        responsive: true,   // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 100000
            },
            scaleLabel: {
              display: true,
              labelString: 'VNĐ'
            }
          }]
        }
      };
      // tslint:disable-next-line:max-line-length
      this.labels4 = ['Tháng 1', 'Tháng 2', 'Tháng 2', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      // setTimeout(() => {
      //   console.log(JSON.parse(sessionStorage.getItem('chart')));

      // }, 3000);
    }
  }
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }
}
