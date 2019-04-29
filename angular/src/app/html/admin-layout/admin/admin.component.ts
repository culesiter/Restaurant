import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../../share/services/DataTransfer/data-transfer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
private headtittle: string;
  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.dataTransferService.getTittle().subscribe(res => this.headtittle = res);
  }

}
