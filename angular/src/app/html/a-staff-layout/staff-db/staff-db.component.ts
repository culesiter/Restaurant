import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../../share/services/DataTransfer/data-transfer.service';
@Component({
  selector: 'app-staff-db',
  templateUrl: './staff-db.component.html',
  styleUrls: ['./staff-db.component.scss']
})
export class StaffDbComponent implements OnInit {

  private headtittle: string;
  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.dataTransferService.getTittle().subscribe(res => this.headtittle = res);
  }
}
