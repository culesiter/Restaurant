import { Component, OnInit } from '@angular/core';
import { PhongserviceService } from '../../share/services/phongservice.service';
import { DichvuService } from '../../share/services/dichvu.service';

@Component({
  selector: 'app-gioithieuphong',
  templateUrl: './gioithieuphong.component.html',
  styleUrls: ['./gioithieuphong.component.scss']
})
export class GioithieuphongComponent implements OnInit {
private loaip: any[] =[];
private loaidv: any[] =[];
  constructor(private phongservice: PhongserviceService, private dvser: DichvuService) { }

  ngOnInit() {
    this.phongservice.laydanhsachloaiphong().subscribe(res=>this.loaip=res)
    this.dvser.laydanhsachDV().subscribe(res=>this.loaidv=res)
  }

}
