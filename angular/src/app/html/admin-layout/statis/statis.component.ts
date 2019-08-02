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
   private title2: any;
  private chartOptions;
  private chartOptions2;
  private mchart = [];
  private labels;
  private colors;
  private labels2;
  private colors2;
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
              // tslint:disable-next-line:max-line-length
              temp.data[month] = temp.data[month] + element.soluongmonan * element._idmonan.gia - (element.soluongmonan * element._idmonan.gia * element._idmonan.khuyenmai / 100);
              this.mchart[index] = temp;
              sessionStorage.setItem('chart', JSON.stringify(this.mchart));
            }
          }
        }
      });
      this.chartData2 = JSON.parse(sessionStorage.getItem('chart'));
    });
  }
  showmodal() {
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
    sessionStorage.setItem('chart', JSON.stringify([]));
    this.laydsHoadon2();
    if (sessionStorage.getItem('chart')) {

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


  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }
}
