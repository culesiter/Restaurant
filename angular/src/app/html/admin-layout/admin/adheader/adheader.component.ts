import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from '../../../../share/services/DataTransfer/data-transfer.service';
@Component({
  selector: 'app-adheader',
  templateUrl: './adheader.component.html',
  styleUrls: ['./adheader.component.scss']
})
export class AdheaderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private dataTransferService: DataTransferService) { }
  private styleExp = 'none';
  private styleExp2 = 'none';
  ngOnInit() {
  }
  activeRouter(b) {
    this.dataTransferService.change(b);
  }
  activeRouter1(a) {
    this.dataTransferService.change(a);
    //  loai mon
    if (this.styleExp === 'none') {
      this.styleExp = 'block';
    } else {
      this.styleExp = 'none';
    }
    // end loai mon
    // open loai phong
    if (this.styleExp2 === 'block') {
      this.styleExp2 = 'none';
    }
    // end loai phong
  }
  activeRouter2(b) {
    this.dataTransferService.change(b);
    if (this.styleExp === 'block') {
      this.styleExp = 'none';
    }
    if (this.styleExp2 === 'none') {
      this.styleExp2 = 'block';
    } else {
      this.styleExp2 = 'none';
    }
  }
}
