import { Component, OnInit } from '@angular/core';
import { DichvuService } from './share/services/dichvu.service';
import * as io from 'socket.io-client';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DichvuService]
})
export class AppComponent implements OnInit {
  // private socket = io('http://localhost:4200');

  title = 'app';
  constructor() {

  }

  ngOnInit() {

  }

}
